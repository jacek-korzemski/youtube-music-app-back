<?php 

route('POST', '^/login$', function() {
  $s = new Auth();
  header('Content-Type: application/json');
  echo $s->login($_POST['username'], $_POST['password']);
});

route('POST', '^/logout$', function() {
  $s = new Auth();
  header('Content-Type: application/json');
  echo $s->logout($_POST['userId'], $_POST['token']);
});

route('POST', '^/updateToken', function() {
  $s = new Auth();
  header('Content-Type: application/json');
  echo $s->updateToken($_POST['userId'], $_POST['token']);
});

route('POST', '^/auth$', function() {
  $s = new Auth();
  header('Content-Type: application/json');
  echo $s->checkToken($_POST['userId'], $_POST['token']);
});

route('POST', '^/register$', function() {
  $s = new Auth();
  header('Content-Type: application/json');
  echo $s->register($_POST['username'], $_POST['email']);
});