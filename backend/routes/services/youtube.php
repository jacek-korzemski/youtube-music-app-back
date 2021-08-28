<?php 

route('GET', '^/youtube/update_channel/(.*?)$', function() {
  if (isset($_GET['id']))
  {
    $s = new Youtube();
    header('Content-Type: application/json');
    if (isset($_GET['page']))
    {
      if (isset($_GET['validate']) && $_GET['validate'] == true)
      {
        $s->updateChannel($_GET['id'], $_GET['page'], false, true);
      }
      else {
        $s->updateChannel($_GET['id'], $_GET['page']);
      }
    }
    else
    {
      if (isset($_GET['validate']) && $_GET['validate'] == true)
      {
        $s->updateChannel($_GET['id'], false, false, true);
      }
      else
      {
        $s->updateChannel($_GET['id']);
      }
    }
  }
  else
  {
    throw new Error('Missing ?id= parameter. Cannot perform channel update.');
  }
});

route('GET', '^/youtube/get_channel_by_name/(.*?)$', function() {
  $s = new Browse();
  $s->getChannelByName($_GET['channel']);
});

route('GET', '^/youtube/get_channel_by_id/(.*?)$', function() {
  $s = new Browse();
  $s->getChannelById($_GET['channel']);
});

route('GET', '^/youtube/get_video/(.*?)$', function() {
  $s = new Browse();
  $s->getVideo($_GET['id']);
});

route('GET', '^/youtube/update_channels_list$', function() {
  $s = new Youtube();
  $s->updateChannelsList();
});

route('GET', '^/youtube/update_all_channels$', function() {
  $s = new Youtube();
  $s->updateAllChannels();
});