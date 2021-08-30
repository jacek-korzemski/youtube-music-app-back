<?php 

require_once __DIR__ . '/../engine/engine.php';
require_once __DIR__ . '/../services/services.php';
require_once "functions.php";

// initialize options for CLI
// a          - actions
// id         - id of video, channel, user etc.
$shortopts = "a:";
$longopts  = array(
  "id:",
);
$options  = getopt($shortopts, $longopts);

if (isset($options['a']))
{
  switch ($options['a'])
  {
    case "update":
      cli_update_channel($options['id']);
      break;
    case "update_all":
      cli_update_all_channels();
      break;
    case "update_channels":
      cli_update_channels_list();
      break;
    case 'build_channel':
      cli_build_channel($options['id']);
    default:
      echo 'Invalid actions. To see the action list, simply run php index.php without arguments.';
      break;
  }
}
else
{
  echo 
  '
    Welcome in Youtube_Music_App Command Line Interface. 
    If you want to update single channel, or get some data of single video
    without using your browser, you can simply use the CLI to get what you need done.

    Here are some usefull commands:
      -a update -id <channel_id>      : use to update single channel via Youtube api (with your key from .env file)
      -a update_all                   : use to update all channels registred in your database
      -a update_channels              : use to update your channels list based on `music` table
      -a get_video -id <video_id>     : TODO - get data of a single record from a `music` table
      -a get_channel -id <channel_id> : TODO - get all records from a selected channel
  ';
}

