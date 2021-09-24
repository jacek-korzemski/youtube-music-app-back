<?php

use Engine\src\Db;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Auth
{
  private $db;
  private $userId;
  private $userToken;

  public function __construct()
  {
    $this->db = new Db();
  }

  public function register($username, $email)
  {
    if (count($this->db->query('SELECT * FROM users WHERE username="'.$username.'"')->fetchAll()) > 0) 
    {
      return '{"code": 400, "status": "error", "message": "the username is already taken. Try a different one."}';
    }
    if (count($this->db->query('SELECT * FROM users WHERE email="'.$email.'"')->fetchAll()) > 0) 
    {
      return '{"code": 400, "status": "error", "message": "the email address is already taken. Try a different one."}';
    }

    $password = $this->generatePassword(12);

    $mail_content = "
    Welcome new user! <br/>
    Now, you should be able to log into application with these credentials: <br/>
    login: $username<br/>
    password: $password<br/>
    <br/>
    <h1>WARNING!</h1>
    Please keep in mind, that this is only a student project! I'm not respinsible for any data los or leakage. I'm not confident enought \r\n
    to guarantee safeness of your data. I suggest, that you should not use your main email. NEVER change your app password for a password that \r\n
    you are already using somewhere else.<br/><br/>
    Have fun :)
    ";

    $mailer = new PHPMailer(true);

    try 
    {
      $mailer->SMTPDebug  = SMTP::DEBUG_OFF;
      $mailer->isSMTP();
      $mailer->Host       = $_SERVER['SMTP_HOST'];
      $mailer->SMTPAuth   = true;
      $mailer->Username   = $_SERVER['SMTP_USER'];
      $mailer->Password   = $_SERVER['SMTP_PASS'];
      $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
      $mailer->Port       = $_SERVER['SMTP_PORT'];
  
      $mailer->setFrom($_SERVER['SMTP_USER'], $_SERVER['MAIL_PAGENAME']);
      $mailer->addAddress($email);
      $mailer->addReplyTo($_SERVER['SMTP_USER'], $_SERVER['MAIL_USERNAME']);
  
      $mailer->isHTML(true);
      $mailer->Subject = 'User registration - MetalMusic Catalog';
      $mailer->Body    = $mail_content;
      $mailer->AltBody = "
        login: $username\r\n
        password: $password\r\n\r\n
        WARNING!\r\n
        Please keep in mind, that this is only a student project! I'm not respinsible for any data los or leakage. 
        I'm not confident enought \r\n
        to guarantee safeness of your data. I suggest, that you should not use your main email. NEVER change your 
        app password for a password that \r\n
        you are already using somewhere else.\r\n\r\n";
      $mailer->send();
    } 
    catch (Exception $e) 
    {
      return '{"code": 999, "status": "error", "message": "Something went terribly wrong during the registration process...", "additionalInfo": "'.$mailer->ErrorInfo.'"}';
    }

    $this->db->query("INSERT INTO `users` (`id`, `username`, `password`, `power`, `email`) VALUES (NULL, '$username', '".md5($password)."', '1', '$email')");
    return '{"code": 200, "status": "success", "message": "Account succesfully created. Email with password has been sent to '.$email.'"}';
  }

  public function login($login, $password)
  {
    $user = $this->db->query('SELECT * FROM users WHERE username="' . $login . '"')->fetchArray();

    if (count($user) == 0)
    {
      return '{"code": 401, "status": "error", "message": "Invalid login or password."}';
    }

    if ($user['password'] == md5($password)) 
    {
      $token = $this->db->query("SELECT * FROM `tokens` WHERE `user_id` = ?", array($user['id']))->fetchArray();
      if (!count($token) == 0) 
      {
        $this->db->query('DELETE FROM `tokens` WHERE `tokens`.`id` = ?', array($token['id']));
      }
      $this->updateToken($user['id'], null, true);
      $token = $this->db->query("SELECT * FROM `tokens` WHERE `user_id` = ?", array($user['id']))->fetchArray();
      $return = (object) [
        'userId'      => $token['user_id'],
        'tokenId'     => $token['id'],
        'tokenHash'   => $token['token'],
        'tokenExpire' => $token['expired_date']
      ];
      return '{"code": 200, "status": "success", "message": "successfully loged in.", "data": '.json_encode($return).'}';   
    } 
    return '{"code": 401, "status": "error", "message": "Invalid login or password."}';
  }

  public function logout($userId, $client_token)
  {
    $db_token = $this->db->query("SELECT * FROM `tokens` WHERE `user_id` = '$userId'")->fetchArray();

    if (count($db_token) == 0) {
      return '{"code": 401, "status": "error", "message": "User was already logged out."}';
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
  public function checkToken($user_id, $client_token)
  {
    $validation = $this->db->query('SELECT * FROM `tokens` WHERE `user_id` = "'.$user_id.'"')->fetchAll();
    if ($validation[0]["token"] == $client_token) {
      return true;
    }
    return false;
  }

  public function updateToken($user_id, $client_token, $is_new = false)
  {
    $rand_hash = md5(rand(10000, 99999));

    if ($is_new)
    {
      $this->db->query("INSERT INTO `tokens` (`id`, `user_id`, `token`, `expired_date`) VALUES (NULL, \"$user_id\", \"$rand_hash\", NULL)");

      $new_token = $this->db->query("SELECT * FROM `tokens` WHERE `user_id` = \"$user_id\"")->fetchAll();
      return json_encode($new_token);
    }

    $old_token = $this->db->query('SELECT * FROM `tokens` WHERE `user_id` = "'.$user_id.'" AND `token` = "'.$client_token.'" ')->fetchAll();
    if (count($old_token) == 0) {
      return 'user is not logged in.';
    }
    $this->db->query('DELETE FROM `tokens` WHERE `id` = "'.$old_token[0]['id'].'"');
    $this->db->query("INSERT INTO `tokens` (`id`, `user_id`, `token`, `expired_date`) VALUES (NULL, \"$user_id\", \"$rand_hash\", NULL)");
    $new_token = $this->db->query('SELECT * FROM `tokens` WHERE `user_id` = "'.$user_id.'"')->fetchAll();
    return json_encode($new_token[0]);
  }

  private function generatePassword($length = 10)
  {
    $characters = '___###$$$0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $new_password = '';
    for ($i = 0; $i < $length; $i++) 
    {
        $new_password .= $characters[rand(0, $charactersLength - 1)];
    }
    return $new_password;
  }
}