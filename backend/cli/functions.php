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