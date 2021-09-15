<?php 

route('POST', '^/getUserData$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token']);
});

route('POST', '^/subscribeChannel$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token'], $_POST['channelId']);
});

route('POST', '^/unsubscribeChannel$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token'], $_POST['channelId']);
});
