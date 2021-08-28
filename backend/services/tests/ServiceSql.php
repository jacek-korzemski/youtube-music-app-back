<?php 

use Engine\src\Db;

class ServiceSql
{
  public $result;
  private $db;

  public function __construct()
  {
    $this->db = new Db();
  }

  public function test()
  {
    $this->result = $this->db->query('SELECT * FROM test_table')->fetchArray();
    return $this->result['name'];
  }
}
