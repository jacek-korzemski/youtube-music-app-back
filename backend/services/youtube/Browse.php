<?php 

use Engine\src\Db;

class Browse
{
  public function __construct()
  {
    $this->db   = new Db();
    $this->auth = new Auth();
  }

  public function getNewVideos()
  {
    $data = $this->db->query("SELECT * FROM (SELECT * FROM `music` ORDER BY id DESC LIMIT 50) sub ORDER BY id ASC")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched last 50 videos.", "items": '.json_encode($data).'}';
  }

  public function getAllChannels()
  {
    $data = $this->db->query("SELECT * FROM `channels`")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched channels list.", "items": '.json_encode($data).'}';
  }

  public function getChannelById($channel)
  {
    if (!isset($channel))
    {
      return '{"code": 404, "status": "error", "message": "Missing params, nothing to show."}';
    }
    $data = $this->db->query("SELECT * FROM `music` WHERE channel_id=\"$channel\" AND hide IS NULL")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched channel by id: '.$channel.'", "items": '.json_encode($data).'}';
  }

  public function getVideo($video)
  {
    if (!isset($video))
    {
      return '{"code": 404, "status": "error", "message": "Missing params. Nothing to show."}';
    }
    $data = $this->db->query("SELECT * FROM `music` WHERE video_id=$video AND hide = NULL")->fetchAll();
    return '{"code": 200, "status": "success", "message": "Successfully fetched video by id: '.$id.'", "items": '.json_encode($data).'}';
  }
}