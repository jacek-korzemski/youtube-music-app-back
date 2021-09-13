/* 
  Create new table `user_profiles` that will containt 
  info about playlists, reviews and votes of user 
*/

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `subscribed_channels` text NOT NULL,
  `playlists` text NOT NULL,
  `reviews` text NOT NULL,
  `votes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*
  Now, becouse this is new table, I need to insert data from 
  `users` table, but only id and username, as a base 
  of user profile 
*/

INSERT INTO `user_profiles` (user_id, display_name)
SELECT id, username
FROM `users`;
