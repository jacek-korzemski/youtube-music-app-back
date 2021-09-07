<?php 

route('GET', '^/getNewVideos$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  echo $s->getNewVideos();
});

route('GET', '^/getAllChannels$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  echo $s->getAllChannels();
});

route('GET', '^/getChannelById$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  if (!isset($_GET['id'])) { $_GET['id'] = null; }
  echo $s->getChannelById($_GET['id']);
});

route('GET', '^/getVideoById$', function() {
  $s = new Browse();
  header('Content-Type: application/json');
  if (!isset($_GET['id'])) { $_GET['id'] = 1; }
  echo $s->getVideo($_GET['id']);
});