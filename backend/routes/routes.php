<?php 

include 'auth/auth_routes.php';
include 'services/youtube.php';

// Testing index page
route('GET', '^/$', function() {
  header('Content-Type: application/json');
  echo '{"message": "Everything seems working fine.", "status":200}';
});