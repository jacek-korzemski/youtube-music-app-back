<?php 

use Engine\src\Db;

class Youtube
{
  protected $db;
  protected $key;

  public function __construct()
  {
    if (isset($_SERVER['YOUTUBE_API_KEY']))
    {
      $this->key  = $_SERVER['YOUTUBE_API_KEY'];
      $this->db   = new Db();
    }
    else
    {
      throw new Error ('There is no Youtube api key declared in .env file, or the .env file is not readable.');
      exit;
    }
  }

  public function updateAllChannels()
  {
    $counter_before = $this->db->query('SELECT COUNT(*) FROM `music`;')->fetchArray()['COUNT(*)'];
    $channels_list = $this->db->query('SELECT * FROM `channels`')->fetchAll();
    foreach ($channels_list as $channel)
    {
      $this->updateChannel($channel['id'], false, true);
    }
    $counter_after = $this->db->query('SELECT COUNT(*) FROM `music`;')->fetchArray()['COUNT(*)'];
    $counter = $counter_after - $counter_before;
    return '{"code": 200, "status": "success", "message": "Channels updated successfully.", "newRecords": '.$counter.'}';
  }

  public function updateChannel($channel_id, $next_page = false)
  {
    $real_id = $this->db->query("SELECT * FROM `channels` WHERE id = \"$channel_id\"")->fetchAll()[0]["channel_id"];
    $data = $this->getChannelData($real_id, $next_page);
    if (!is_object($data)) {
      echo $data." \n";
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
      `channel_title`,
      `hide`) 
      VALUES ';

    if ($data && $data->items)
    {
      foreach ($data->items as $item)
      {
        if (get_headers($item->snippet->thumbnails->medium->url, 1)[0] != "HTTP/1.1 200 OK")
        {
          $set_hide = "1";
        }
        else {
          $set_hide = "NULL";
        }
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
            \''. preg_replace("/'/i", "|", $item->snippet->channelTitle) .'\',
            '.$set_hide.')';
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
      $this->db->query($query);
      if (isset($data) && isset($data->nextPageToken)) {
        return '{"code": 200, "status": "success", "message": "update success", "next-page": "'.$data->nextPageToken.'"}';
      }
      return '{"code": 200, "status": "success", "message": "update success", "next-page": null}';
    }
  }

  public function updateChannelsList()
  {
    $this->db->query('
      INSERT IGNORE INTO `channels` (channel_id, channel_title) SELECT 
      channel_id, channel_title FROM `music` GROUP BY
      channel_id, channel_title HAVING COUNT(*) > 1;
    ');
    return '{"code": 200, "status": "success", "message": "Channels list updated"}';
  }

  public function getAllVideos()
  {
    $videos = $this->db->query('SELECT * FROM `music`;')->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched all videos". "items": '.$this->buildJsonResponse($videos).'}';
  }

  public function getAllVideosFromChannel($channel)
  {
    $videos = $this->db->query("SELECT * FROM `music` WHERE channel_id = \"$channel\";")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched all videos from channel with id: '.$channel.'.", "items": '.$this->buildJsonResponse($videos).'}';
  }

  public function getVideos($from, $to)
  {
    $videos = $this->db->query("SELECT * FROM `music` WHERE `id` BETWEEN $from and $to")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched all videos from id: '.$from.' to id: '.$to.'", "items": '.$this->buildJsonResponse($videos).'}';
  }

  public function getVideo($id)
  {
    $video = $this->db->query("SELECT * FROM `music` WHERE `id` = $id")->fetchAll();
    if (is_array($video))
    {
      return '{"code": 200, "status": "success", "message": "Successfully fetched video data with id: '.$id.'", "video": '.json_encode($video).'}';
    }
    else
    {
      return '{"code": 404, "status": "error", "message": "Video with id: '.$id.' does not exist.", "video": '.json_encode($video).'}';
    }
  }

  public function getAllChannels()
  {
    $channels = $this->db->query("SELECT * FROM `channels`")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched all channels data.", "channels": '.$this->buildJsonResponse($channels).'}';
  }

  public function __clearDatabaseFromTrashyRecords()
  {
    $channels = $this->db->query("SELECT * FROM `channels`")->fetchAll();
    $query    = 'DELETE FROM `music` WHERE channel_id NOT IN (';

    foreach ($channels as $channel)
    {
      $query .= '"'.$channel['channel_id'].'"';
      if (next($channels))
      {
        $query .= ",";
      }
    }

    $query .= "); \n";
    $this->db->query($query);
    echo "Deleted records: " . $this->db->affectedRows();
  }

  public function __clearDatabaseFrom404Records()
  {
    $videos = $this->db->query("SELECT * FROM `music`")->fetchAll();
    $delete_counter = 0;
    $restore_counter = 0;
    foreach ($videos as $video)
    {
      if (get_headers($video['default_thumbnail'], 1)[0] != "HTTP/1.1 200 OK" && $video['hide'] == NULL)
      {
        $delete_counter++;
        $this->db->query('UPDATE `music` SET hide = 1 WHERE id = '. $video['id']);
        echo $video['id'] . " - deleted becouse of ".get_headers($video['default_thumbnail'], 1)[0]." \n";
      }
      if (get_headers($video['default_thumbnail'], 1)[0] == "HTTP/1.1 200 OK" && $video['hide'] == 1)
      {
        $restore_counter++;
        $this->db->query('UPDATE `music` SET hide = NULL WHERE id = '. $video['id']);
        echo $video['id'] . " - restored becouse of ".get_headers($video['default_thumbnail'], 1)[0]." \n";
      }
    }
    echo "deleted: $delete_counter records. \n restored: $restore_counter records. \n";
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
      return '{"code": 500, "status": "error", "message": "It seems, that your API key is used enough for today. Try again tomorow.", "next-page": null}';
    }
  }

  private function buildJsonResponse($array)
  {
    $result  = "";
    $result .= "[";
    foreach ($array as $item)
    {
      $result .= json_encode($item);
      if (next($array))
      {
        $result .= ", \n";
      }
    }
    $result .= "]";
    return $result;
  }
}