/*
  New tables for user's playlists, subscribptions, votes and reviews
*/

/* SUBSCRIPTIONS */

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

/* PLAYLISTS */

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `playlist_name` varchar(255) NOT NULL,
  `playlist_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

CREATE TABLE `playlists_records` (
  `id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `playlists_records`
  ADD PRIMARY KEY (`id`);

/* VOTES */

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL,
  `vote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

/* REVIEWS */

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);