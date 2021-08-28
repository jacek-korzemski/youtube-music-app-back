<?php 

class Browse extends Youtube
{
  public function getChannelByName($channel, $userId, $token)
  {
    header('Content-Type: application/json');
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
    header('Content-Type: application/json');
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
    header('Content-Type: application/json');
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