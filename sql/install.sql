/* Initial Settings */

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/* Create Users Table */

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `power` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

/* Create tokens table */

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiredDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

/* Create channels table */

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `channel_id` varchar(255) NOT NULL,
  `channel_title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `channel_id` (`channel_id`);

ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

/* Creater music table */

CREATE TABLE `music` (
  `id` double NOT NULL,
  `channel_id` varchar(255) NOT NULL,
  `video_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `published_at` datetime NOT NULL,
  `default_thumbnail` text NOT NULL,
  `medium_thumbnail` text NOT NULL,
  `high_thumbnail` text NOT NULL,
  `channel_title` varchar(255) NOT NULL,
  `hide` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_id` (`video_id`);

ALTER TABLE `music`
  MODIFY `id` double NOT NULL AUTO_INCREMENT;

COMMIT;