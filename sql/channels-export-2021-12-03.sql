SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

ALTER TABLE `channels`
  ADD UNIQUE KEY `channel_id` (`channel_id`);

INSERT INTO `channels` (`id`, `channel_id`, `channel_title`) VALUES
(16, 'UC7eKF0lPY8LNwfczq9UFlxg', '666MrDoom'),
(17, 'UCCGbKiCJjph8Grazqmo7z4w', 'NWOTHM Full Albums'),
(46, 'UCDLkzWN1rHY4eYkGnVruHVw', 'Atmospheric Black Metal Albums'),
(47, 'UCdZ7t90tgjwOO9PVhzT5A2g', 'Greg Biehl'),
(48, 'UCF59XW79xD3iFnlA7TDcaEA', 'Melomano Adicto'),
(49, 'UCknVpWR6m2Ijzkqo-aPXs_g', 'Stoned Meadow Of Doom'),
(50, 'UCQCOPXu0SIAVNzFs7AOTYBg', 'Dot Dot Dot'),
(51, 'UCqYXSKzxN6TS0yfb12yQW4Q', 'mpampis flou'),
(53, 'UCtqNS8M6T9KkC1qHDGk7WcQ', 'Rock Freaks [official]'),
(54, 'UCwfonT2RaN3ovsu1Qa22Xbw', 'ROB HAMMER *stonerdoom*psych*sludge*grunge*metal*'),
(56, 'UCzCWehBejA23yEz3zp7jlcg', 'Black Metal Promotion');

ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
COMMIT;
