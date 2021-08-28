# Youtube music app

Simple REST API for my youtube music frontend app. The concept is simple:
Build database with youtube data from music aggregator channels (like "NewRetroWave"), and store them in one place.
Then, in frontend app, read the database and show embeded youtube videos/music.
All favorite music from youtube in one place. Search by genre, allow rating (from 1 to 5 instead of thumbs up and down only) etc.

## Current working routes

Get last 50 videos from channel by ID, and put only new videos into the database.

```
/youtube/update_channel/?id=[channel-id]
```

Get last 50 videos from channel by ID with offset page, and put only new videos into the database.

```
/youtube/update_channel/?id=[channel-id]&page=[nextPageToken]
```

Get all videos from channel by channel name

```
/youtube/get_channel_by_name/?channel=[channel-name]
```

Get all videos from channel by channel id

```
/youtube/get_channel_by_id/?channel=[channel-id]
```

Get single video by video id

```
/youtube/get_video/?id=[video-id]
```
