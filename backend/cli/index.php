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
  "from:",
  "to:",
  "all"
);
$options  = getopt($shortopts, $longopts);

if (isset($options['a']))
{
  switch ($options['a'])
  {
    case "update_channel":
      $id   =   isset($options['id'])     ?   $options['id']  : false;
      cli_update_channel($id);
      break;
    case "update_all":
      cli_update_all_channels();
      break;
    case "update_channels":
      cli_update_channels_list();
      break;
    case 'build_channel':
      $id   =   isset($options['id'])     ?   $options['id']  : false;
      cli_build_channel($id);
      break;
    case 'get_videos':
      $from =   isset($options['from'])              ?   $options['from']   : false;
      $to   =   isset($options['to'])                ?   $options['to']     : false;
      $all  =   array_key_exists("all", $options)    ?   true               : false;
      cli_get_videos($from, $to, $all);
      break;
    case 'get_video':
      $id   =   isset($options['id'])                ?   $options['id']     : false;
      cli_get_video($id);
      break;
    case 'get_channel':
      $id   =   isset($options['id'])                ?   $options['id']     : false;
      cli_get_channel($id);
      break;
    case 'get_all_channels':
      cli_get_all_channels();
      break;
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
      -a update --id <channel_id>        : use to update single channel via Youtube api (with your key from .env file)
      -a update_all                      : use to update all channels registred in your database
      -a update_channels                 : use to update your channels list based on `music` table
      -a build_channel --id <channel_id> : use to get all videos from selected channel
      -a get_video --id <video_id>       : use to get data of a single record from a `music` table
      -a get_channel --id <channel_id>   : use to get all records from a selected channel
  ';
}

