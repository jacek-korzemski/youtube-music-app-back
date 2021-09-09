/* 
  Some channels beside albums and songs, also uploads some vlogs,
  livestreams etc. that doesn't seem to fit into my app. So I've added
  "deleted" column in `music` table. Now, if something has deleted=1,
  it won't be shown on front, but also 
  will not be fetched again from channels.
*/

/*
  IDs to delete: 4382, 4383, 4386, 4389;
*/

UPDATE `music` SET deleted = 1 WHERE id IN (4382, 4383, 4386, 4389);