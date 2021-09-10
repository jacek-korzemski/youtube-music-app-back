<?php

use Engine\src\Db;

class Auth
{
  private $db;
  private $userId;
  private $userToken;

  public function __construct()
  {
    $this->db = new Db();
  }

  public function login($login, $password)
  {
    $password_hash = md5($password);
    $user = $this->db->query('SELECT * FROM users WHERE username="' . $login . '"')->fetchArray();
    if (count($user) != 0)     
    {      
      if ($user['password'] == md5($password)) 
      {
        $token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($user['id']))->fetchArray();
        if (!count($token) == 0) 
        {
          $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($token['id']));
        }
        $this->updateToken($user['id']);
        $token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($user['id']))->fetchArray();
        $return = (object) [
          'userId'      => $token['userId'],
          'tokenId'     => $token['id'],
          'tokenHash'   => $token['token'],
          'tokenExpire' => $token['expiredDate']
        ];
        return '{"code": 200, "status": "success", "message": "successfully loged in.", "data": '.json_encode($return).'}';   
      } 
      else 
      {
        return '{"code": 500, "status": "error", "message": "Something went wrong during the authentication process. Please try again later."}';
      } 
    } 
    else 
    {
      return '{"code": 401, "status": "error", "message": "Invalid login or password."}';
    }
  }

  public function logout($userId, $client_token)
  {
    $db_token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($userId))->fetchArray();

    if (count($db_token) == 0) {
      return '{"code": 401, "status": "error", "message": "Wser was already logged out."}';
    }

    if ($db_token['token'] != $client_token)
    {
      return '{"code": 401, "status": "error", "message": "Invalid auth token."}';
    }

    if ($db_token['token'] == $client_token)
    {
      $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($db_token['id']));
      return '{"code": 200, "status": "success", "message": "User loged out."}';
    }

    return '{"code": 999, "status": "error", "message": "Something went terribly wrong during the logout..."}';
  }

  public function checkToken($userId, $client_token)
  {
    $db_token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($userId))->fetchArray();

    if (count($db_token) == 0) {
      return '{"code": 401, "status": "error", "message": "User is not logged in.", "action": null}';
    }

    if ($db_token['expiredDate'] < date('Y-m-d H:i:s'))
    {
      $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($db_token['id']));
      return '{"code": 401, "status": "error", "message": "Token has expired. User logged out.", "action": "logout"}';
    }

    if ($db_token['expiredDate'] >= date('Y-m-d H:i'))
    {
      return '{"code": 200, "status": "success", "message": "Token is still valid.", "action": "pass"}';
    }
  }

  private function updateToken($id)
  {
    $randHash = md5(rand(10000, 99999));
    if (isset($_SERVER['TOKEN_EXPIRE_TIME']))
    {
      $timestamp = strtotime(date('Y-m-d H:i')) + $_SERVER['TOKEN_EXPIRE_TIME']*60;
    }
    else 
    {
      $timestamp = strtotime(date('Y-m-d H:i')) + 60*60;
    }
    $expire = date('Y-m-d H:i', $timestamp);
    $this->db->query(
      'INSERT into `tokens` (`id`, `userId`, `token`, `expiredDate`) VALUES (?, ?, ?, ?)',
      array(null, $id, $randHash, $expire)
    );
    return '{"code": 200, "status": "success", "message": "Token successfully updated"}';
  }
}