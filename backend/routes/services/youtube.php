<?php 

/*
HUGE TO-DO, TO-FIX, TO-REFACTOR...

Right now, my focus is on carrying the database with CLI.

route('POST', '^/youtube/get_channel_by_name/(.*?)$', function() {
  $s = new Browse();
  $s->getChannelByName($_POST['channel'], $_POST['userId'], $_POST['token']);
});

route('POST', '^/youtube/get_channel_by_id/(.*?)$', function() {
  $s = new Browse();
  $s->getChannelById($_POST['channel'], $_POST['userId'], $_POST['token']);
});

route('POST', '^/youtube/get_video/(.*?)$', function() {
  $s = new Browse();
  $s->getVideo($_POST['id'], $_POST['userId'], $_POST['token']);
});
*/