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

  public function subscribeChannel($userId, $clientToken, $channelId)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `subscriptions` (`id`, `user_id`, `channel_id`) VALUES (NULL, '$userId', '$channelId');");
    return '{"code": 200, "status": "success", "message": "Successfully subscribed channel."}';
  }

  public function unsubscribeChannel()
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `subscriptions` WHERE `userId` = '$userId' AND `channel_id` = '$channelId'");
    return '{"code": 200, "status": "success", "message": "Successfully unsubscribed channel."}';
  }

  public function createPlaylists($userId, $clientToken, $playlistName, $playlistDescription)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `playlists` (`id`, `user_id`, `playlist_name`, `playlist_description`) VALUES (NULL, '$userId', '$playlistName', '$playlistDescription')");
    return '{"code": 200, "status": "success", "message": "Successfully created playlist."}';
  }

  public function removePlaylist()
  {
    if (!$this->validation($userId, $clientToken, $playlistId))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `playlists` WHERE `id` = '$playlistId'");
    return '{"code": 200, "status": "success", "message": "Successfully removed playlist."}';
  }

  public function addRecordToPlaylist($userId, $clientToken, $playlistId, $recordId)
  {
    if (!$this->validation($userId, $clientToken, $playlistId))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `playlists_records` (`id`, `playlist_id`, `record_id`) VALUES (NULL '$playlistId', '$recordId')");
    return '{"code": 200, "status": "success", "message": "Successfully added record to playlist."}';
  }

  public function removeRecordFromPlaylist($userId, $clientToken, $playlistRecordId)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `playlists_records` WHERE `id` = '$playlistRecordId'");
    return '{"code": 200, "status": "success", "message": "Successfully removed record from playlist."}';
  }

  public function voteForRecord($userId, $clientToken, $recordId, $vote)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `votes` (`id`, `user_id`, `record_id`, `vote`) VALUES (NULL, '$userId', '$recordId', '$vote')");
    return '{"code": 200, "status": "success", "message": "Successfully voted for record."}';
  }

  public function removeVoteFromRecord($userId, $clientToken, $voteRecordId)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `votes` WHERE `id` = '$voteRecordId'");
    return '{"code": 200, "status": "success", "message": "Successfully removed vote from record."}';
  }

  public function addReview($userId, $clientToken, $recordId, $content)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("INSERT INTO `reviews` (`id`, `user_id`, `record_id`, `content`) VALUES (NULL, '$userId', '$recordId', '$content')");
    return '{"code": 200, "status": "success", "message": "Successfully posted review."}';
  }

  public function removeReview($userId, $clientToken, $reviewId)
  {
    if (!$this->validation($userId, $clientToken))
    {
      return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
    }
    $this->db->query("DELETE FROM `reviews` WHERE `id` = '$reviewId'");
    return '{"code": 200, "status": "success", "message": "Successfully removed review."}';
  }

  private function validation($userId, $clientToken)
  {
    $validation = json_decode($this->auth->checkToken($userId, $clientToken));
    if ($validation && $validation->code == 200)
    {
      return true;
    }
    return false;
  }
}