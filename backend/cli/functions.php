<?php 

function cli_update_channel($channel_id)
{
  if ($channel_id)
  {
    $s = new Youtube();
    $s->updateChannel($channel_id);
    return;
  }
  else
  {
    throw new Error ('Missing channel id. Cannot perform update.');
  }
}

function cli_update_all_channels()
{
  $s = new Youtube();
  $s->updateAllChannels();
  return;
}

function cli_update_channels_list()
{
  $s = new Youtube();
  $s->updateChannelsList();
  return;
}

function cli_build_channel($channel_id, $page = false)
{
  if (!$channel_id)
  {
    echo "\n\n Missing id parameter. Make sure you typed \"--id\" insted of \"-id\", and try again.";
    return;
  }
  $s = new Youtube();
  ob_start();
  if ($page)
  {
    $s->updateChannel($channel_id, $page);
  }
  else
  {
    $s->updateChannel($channel_id);
  }
  $result = ob_get_contents();
  ob_end_clean();

  // display to console, then process, check if there is another page, and run again.
  echo $result . "\n";

  $result = json_decode($result);
  if ($result->{'next-page'})
  {
    cli_build_channel($channel_id, $result->{'next-page'});
    return;
  }
  else
  {
    echo '{"status": 200, "message": "It looks like the channel has successfuly build."}';
    cli_update_all_channels();
  }
  return;
}