<?php

use Engine\src\Db;

class User
{
  public function __construct()
  {
    $this->db = new Db();
  }
}