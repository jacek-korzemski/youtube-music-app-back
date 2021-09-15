/*
  I've found out, that some columns are named in camel case, and some with undescores.
  To keep everything nice, I'm fixing the names of columns for underscores.
*/

ALTER TABLE `tokens` CHANGE `userId` `user_id` INT(11) NOT NULL;
ALTER TABLE `tokens` CHANGE `expiredDate` `expired_date` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
