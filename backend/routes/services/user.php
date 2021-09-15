<?php 

route('POST', '^/getUserData$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token']);
});

route('POST', '^/subscribeChannel$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->subscribeChannel($_POST['userId'], $_POST['token'], $_POST['channelId']);
});

route('POST', '^/unsubscribeChannel$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->unsubscribeChannel($_POST['userId'], $_POST['token'], $_POST['channelId']);
});

route('POST', '^/createPlaylists$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->createPlaylists($_POST['userId'], $_POST['token'], $_POST['playlistName'], $_POST['playlistDescription']);
});

route('POST', '^/removePlaylist$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->removePlaylist($_POST['userId'], $_POST['token'], $_POST['playlistId']);
});

route('POST', '^/addRecordToPlaylist$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token'], $_POST['playlistId'], $_POST['recordId']);
});

route('POST', '^/removeRecordFromPlaylist$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token'], $_POST['playlistRecordId']);
});
