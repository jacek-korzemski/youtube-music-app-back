<?php 

route('POST', '^/getUserData$', function() {
  $s = new User();
  header('Content-Type: application/json');
  echo $s->getUserData($_POST['userId'], $_POST['token']);
});
