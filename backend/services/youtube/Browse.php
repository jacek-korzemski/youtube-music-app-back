<?php 

use Engine\src\Db;

//
// ONE
// HUGE
// TO-DO
// TO-REFACTOR
// TO-FIX
// TO... die? maybe.
//

class Browse
{
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

  public function getChannelByName($channel, $userId, $token)
  {
    if (!isset($channel))
    {
      echo '{"status": "error", "message": "Missing params."}';
      return false;
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query('SELECT * FROM `music` WHERE channel_title="' . $channel . '"')->fetchAll();
      echo json_encode($data);
      return true;
    }
    echo '{"status": "error", "message": "Missing or invalid authorization token."}';
    return false;
  }

  public function getChannelById($channel, $userId, $token)
  {
    if (!isset($channel))
    {
      echo '{"status": "error", "message": "Missing params."}';
      return false;
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query('SELECT * FROM `music` WHERE channel_id="' . $channel . '"')->fetchAll();
      echo json_encode($data);
      return true;
    }
    echo '{"status": "error", "message": "Missing or invalid authorization token."}';
    return false;
  }

  public function getVideo($video, $userId, $token)
  {
    if (!isset($video))
    {
      echo '{"status": "error", "message": "Missing params."}';
      return false;
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query('SELECT * FROM `music` WHERE video_id="' . $video . '"')->fetchArray();
      echo json_encode($data);
      return true;
    }
    echo '{"status": "error", "message": "Missing or invalid authorization token."}';
    return false;
  }
}