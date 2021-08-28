<?php 

use Engine\src\Db;

class Youtube
{
  protected $db;
  protected $auth;
  private $key;

  public function __construct()
  {
    if (isset($_SERVER['YOUTUBE_API_KEY']))
    {
      $this->key  = $_SERVER['YOUTUBE_API_KEY'];
      $this->db   = new Db();
      $this->auth = new Auth();
    }
    else
    {
      throw new Error ('There is no Youtube api key declared in .env file, or the .env file is not readable.');
    }
  }

  public function updateAllChannels()
  {
    $channels_list = $this->db->query('SELECT * FROM `channels`')->fetchAll();
    foreach ($channels_list as $channel)
    {
      $this->updateChannel($channel['channel_id'], false, true);
    }
    header('Content-Type: application/json');
    echo '{"status": 200, "message": "Channels updated successfully."}';
  }

  public function updateChannel($channel_id, $next_page = false, $silent = false, $validate_query = false)
  {
    $data = $this->getChannelData($channel_id, $next_page);
    if (!is_object($data)) {
      echo 'no object: ' . $data;
      return;
    }
    $query = 'INSERT IGNORE INTO `music` (
      `id`, 
      `channel_id`, 
      `video_id`, 
      `title`, 
      `url`, 
      `published_at`, 
      `default_thumbnail`, 
      `medium_thumbnail`, 
      `high_thumbnail`, 
      `channel_title`) 
      VALUES ';

    if ($data && $data->items)
    {
      foreach ($data->items as $item)
      {
        if (isset($item) && isset($item->id) && isset($item->id->videoId))
        {
          $query.= '(
            NULL, 
            \''. preg_replace("/'/i", "|", $item->snippet->channelId) .'\', 
            \''. preg_replace("/'/i", "|", $item->id->videoId) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->title) .'\', 
            \''. preg_replace("/'/i", "|", $item->id->videoId) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->publishedAt) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->thumbnails->default->url) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->thumbnails->medium->url) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->thumbnails->high->url) .'\', 
            \''. preg_replace("/'/i", "|", $item->snippet->channelTitle) .'\')';
        }
        if(!next($data->items)) 
        {
          $query.= ';';
        }
        else
        {
          $query.= ', ';
        }

        $query = preg_replace("/, ;/i", ";", $query);
        $query = preg_replace("/, ,/i", ",", $query);
      }
      if ($validate_query) {
        echo 'query: ' . $query . "\n\n"; 
      }
      $this->db->query($query);
      if (!$silent)
      {
        header('Content-Type: application/json');
        if (isset($data) && isset($data->nextPageToken)) {
          echo '{"status": 200, "message": "update success", "next-page": "'.$data->nextPageToken.'"}';
          return;
        }
        echo '{"status": 200, "message": "update success", "next-page": null}';
        return;
      }
    }
    else 
    {
      if (!$silent)
      {
        header('Content-Type: application/json');
        echo '{"status": 400, "message": "update failed", "next-page": null}';
        return;
      }
    }
  }

  public function updateChannelsList()
  {
    $this->db->query('
      INSERT IGNORE INTO `channels` (channel_id, channel_title) SELECT 
      channel_id, channel_title FROM `music` GROUP BY
      channel_id, channel_title HAVING COUNT(*) > 1;
    ');
    header('Content-Type: application/json');
    echo '{"status": 200, "message": "Channels list updated"}';
    return true;
  }

  private function getChannelData($channel_id, $next_page = false)
  {
    $api_url = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet';
    $api_url.= '&channelId='.$channel_id;
    $api_url.= '&maxResults=50';
    $api_url.= '&key='.$this->key.'';
    if ($next_page)
    {
      $api_url.= '&pageToken=' . $next_page;
    }
    $result  = @file_get_contents($api_url); 

    if ($result)
    { 
      return json_decode($result); 
    }
    else
    { 
      error_log(date('Y-m-d h:i') . " - The API key is used enough for today. Try again tomorow. \n", 3, __DIR__ . "/../../logs/errors.log");
      header('Content-Type: application/json');
      return '{"status": 500, "message": "It seems, that your API key is used enough for today. Try again tomorow.", "next-page": null}';
    }
  }
}