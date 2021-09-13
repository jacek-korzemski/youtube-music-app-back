<?php 

include 'auth/auth.php';
include 'services/browse.php';
include 'services/user.php';

// Testing index page
route('GET', '^/$', function() {
  header('Content-Type: application/json');
  echo '{"code": 200, "status": "success", "message": "everything seems to work fine."}';
});