<?php 

use Engine\src\Db;

class Browse
{
  public function __construct()
  {
    $this->db   = new Db();
    $this->auth = new Auth();
  }

  public function getChannelByName($channel, $userId, $token)
  {
    if (!isset($channel))
    {
      return '{"code": 404, "status": "error", "message": "Missing params, nothing to show."}';
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query("SELECT * FROM `music` WHERE channel_title=\"$channel\" AND hide = NULL")->fetchAll();
      return '{"code": 200, "status": "success", "message": "Successfully fetched channel: '.$id.'", "items": '.json_encode($data).'}';
    }
    return '{"code": 401, "status": "error", "message": "Missing or invalid authorization token."}';
  }

  public function getChannelById($channel, $userId, $token)
  {
    if (!isset($channel))
    {
      return '{"code": 404, "status": "error", "message": "Missing params, nothing to show."}';
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query("SELECT * FROM `music` WHERE channel_id=\"$channel\" AND hide = NULL")->fetchAll();
      return '{"code": 200, "status": "success", "message": "Successfully fetched channel by id: '.$id.'", "items": '.json_encode($data).'}';
    }
    return '{"code": 401, "status": "error", "message": "Missing or invalid authorization token."}';
  }

  public function getVideo($video, $userId, $token)
  {
    if (!isset($video))
    {
      return '{"code": 404, "status": "error", "message": "Missing params. Nothing to show."}';
    }
    if ($this->auth->checkToken($userId, $token))
    {
      $data = $this->db->query("SELECT * FROM `music` WHERE video_id=$video AND hide = NULL")->fetchAll();
      return '{"code": 200, "status": "success", "message": "Successfully fetched video by id: '.$id.'", "items": '.json_encode($data).'}';
    }
    return '{"status": "error", "message": "Missing or invalid authorization token."}';
  }
}