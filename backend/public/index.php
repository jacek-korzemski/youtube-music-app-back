<?php

// run app
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once __DIR__ . '/../engine/engine.php';
require_once __DIR__ . '/../services/services.php';
require_once __DIR__ . '/../routes/routes.php';

// if route fails, 404
header("HTTP/1.0 404 Not Found");
echo '404 Not Found';