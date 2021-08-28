<?php 

class ServiceJson
{
  public $a;
  public function __construct()
  {
    $this->a = (object) [
      'first_string' => "this is the first string",
      'first_array'  => ["this", "is", "the", "first", "array"]
    ];

    $this->a = json_encode($this->a, JSON_FORCE_OBJECT);
  }

  public function test()
  {
    return $this->a;
  }
}