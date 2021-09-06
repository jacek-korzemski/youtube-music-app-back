<?php 

route('POST', '^/getChannelByName$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  echo $s->getChannelByName($_POST['title'], $_POST['userId'], $_POST['token']);
});

route('POST', '^/getChannelById$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  echo $s->getChannelById($_POST['id'], $_POST['userId'], $_POST['token']);
});

route('POST', '^/getVideoById$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  echo $s->getVideo($_POST['id'], $_POST['userId'], $_POST['token']);
});