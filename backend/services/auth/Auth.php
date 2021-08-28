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
        header('Content-Type: application/json');
        return json_encode($return);   
      } 
      else 
      {
        throw new Error ('Incorect username or password.');
      } 
    } 
    else 
    {
      throw new Error ('Incorect username or password.');
    }
  }

  public function logout($userId, $client_token)
  {
    $db_token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($userId))->fetchArray();

    if (count($db_token) == 0) {
      header('Content-Type: application/json');
      return '{"status": "error", "message": "user was already logged out."}';
    }

    if ($db_token['token'] != $client_token)
    {
      header('Content-Type: application/json');
      return '{"status": "error", "message": "Cannot execute request. User tokken did not match."}';
    }

    if ($db_token['token'] == $client_token)
    {
      $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($db_token['id']));
      header('Content-Type: application/json');
      return '{"status": "success", "message": "user loged out."}';
    }

    throw new Error ('Something went terribly wrong during logout...');
  }

  public function checkToken($userId, $client_token, $internal = false)
  {
    $db_token = $this->db->query("SELECT * FROM `tokens` WHERE `userId` = ?", array($userId))->fetchArray();

    if (count($db_token) == 0) {
      if ($internal) 
      {
        return false;
      }
      else 
      {
        header('Content-Type: application/json');
        return '{"status": "error", "message": "User is not logged in.", "action": null}';
      }
    }

    if ($db_token['expiredDate'] < date('Y-m-d H:i:s'))
    {
      $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($db_token['id']));
      if ($internal) 
      {
        return false;
      }
      else 
      {
        header('Content-Type: application/json');
        return '{"status": "error", "message": "Token has expired. User logged out.", "action": "logout"}';
      }
    }

    if ($db_token['expiredDate'] >= date('Y-m-d H:i'))
    {
      $this->updateToken($db_token['userId']);
      if ($internal) 
      {
        return true;
      }
      else 
      {
        header('Content-Type: application/json');
        return '{"status": "success", "message": "Token is still valid.", "action": "pass"}';
      }
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
      throw new Error (
        "You should define your token expire time in your .env file. 
        Right now, it's not defined. 
        Setting to default expire time: 60 minutes.
      ");
      $timestamp = strtotime(date('Y-m-d H:i')) + 60*60;
    }
    $expire = date('Y-m-d H:i', $timestamp);
    $this->db->query(
      'INSERT into `tokens` (`id`, `userId`, `token`, `expiredDate`) VALUES (?, ?, ?, ?)',
      array(null, $id, $randHash, $expire)
    );
  }
}