<?php

use Engine\src\Db;

class User
{
  public function __construct()
  {
    $this->db = new Db();
    $this->auth = new Auth();
  }

  public function getUserData($userId, $clientToken)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $data = $this->db->query("SELECT * FROM `user_profiles` WHERE `user_id` = \"$userId\"")->fetchAll()[0];
    return '{"code": 200, "status": "success", "message": "Successfully fetched user data.", "data": '.json_encode($data).'}';
  }

  public function subscribeChannel($userId, $clientToken, $channel_id)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `subscriptions` (`id`, `user_id`, `channel_id`) VALUES (NULL, '$userId', '$channel_id');");
    return '{"code": 200, "status": "success", "message": "Successfully subscribed channel."}';
  }

  public function unsubscribeChannel()
  {
    if (!$this->validation($userId, $clientToken, $channel_id))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `subscriptions` WHERE `userId` = '$userId' AND `channel_id` = '$channel_id'");
    return '{"code": 200, "status": "success", "message": "Successfully unsubscribed channel."}';
  }

  public function createPlaylists()
  {

  }

  public function removePlaylist()
  {

  }

  public function addRecordToPlaylist()
  {

  }

  public function removeRecordFromPlaylist()
  {
    
  }

  public function voteForRecord()
  {

  }

  public function removeVoteFromRecord()
  {

  }

  public function addReview()
  {

  }

  public function removeReview()
  {

  }

  private function validate()
  {
    $validation = json_decode($this->auth->checkToken($userId, $clientToken));
    if ($validation && $validation->code == 200)
    {
      return true;
    }
    return false;
  }
}