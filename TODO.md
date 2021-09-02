# CLI Command to automatic detect and remove invalid or deleted youtube videos

First of all, instead of deleting the videos, we will add a flag in "hide" column for the record. Sometimes, the song is set as coming-soon premiere. In that cases, we can't listen it in embed format. Sometimes, videos are hidden for a short period of time. And lastly, if we delete records permanently, it could be added again in update_channel command, and we want to avoid it.

So, I had that briliant idea - check if the thumbnal for the record is 404 - if true: add hide flag. If not, and has hide flag, then remove hide flag. That kind of service could be running twice a day through the whole database, and it should be good enough to clean wrong videos from it.

It looks like checking the thumbnail status doesn't require youtube KEY, so there is a chance, that nothing will stop us agaist mass checking a lot of records. :D
