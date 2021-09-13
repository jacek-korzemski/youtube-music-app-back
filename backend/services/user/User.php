<?php

use Engine\src\Db;

class User
{
  public function __construct()
  {
    $this->db = new Db();
    $this->auth = new Auth();
  }

  public function getUserData($userId, $client_token)
  {
    $validation = $this->auth->checkToken($userId, $client_token);
    if (json_decode($validation))
    {
      $result = json_decode($validation);
      if ($result->code == 200)
      {
        $data = $this->db->query("SELECT * FROM `user_profiles` WHERE `user_id` = \"$userId\"")->fetchAll()[0];
        return '{"code": 200, "status": "success", "message": "Successfully fetched user data.", "data": '.json_encode($data).'}';
      }
    }
    return '{"code": 401, "status": "error", "message": "Cannot authenticate user."}';
  }
}