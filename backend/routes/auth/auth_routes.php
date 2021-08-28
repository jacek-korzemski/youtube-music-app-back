<?php 

route('POST', '^/login$', function() {
  $l = new Auth();
  echo $l->login($_POST['username'], $_POST['password']);
});

route('POST', '^/logout$', function() {
  $l = new Auth();
  echo $l->logout($_POST['userId'], $_POST['token']);
});

route('POST', '^/auth$', function() {
  $l = new Auth();
  echo $l->checkToken($_POST['userId'], $_POST['token']);
});