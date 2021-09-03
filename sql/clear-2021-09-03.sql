/* 
  Becouse I will use my app mostly for metal music, 
  I have to remove all non-metal content from it for now.
*/

/*
  Channels ids (real), that I want to remove from database:
  UCAepXw94EhaO0CZV9f5D3fQ : The Psychedelic Muse
  UCAZ77vdqYbuGbCAWB62WbqQ : NRW Records
  UCD-4g5w1h8xQpLaNS_ghU4g : NewRetroWave
  UCSXm6c-n6lsjtyjvdD0bFVw : Liquicity
  UCxs8r_GaKqb3RUZjcmwNxIA : Infinity VideoHUB
  UC6ghlxmJNMd8BE_u1HR-bTg : The |80s Guy
  UCbtPbB67JMa9TjlLTrOnqbQ : Synth Heaven
  UCfLFTP1uTuIizynWsZq2nkQ : UKF Dubstep
  UCTjkEBD5wXS6VkmmjnLIFcg : No.1
  UCUdXKBcpjJH8v1-8Y0fYWPw : Quantum Dream
  UC8fqt_PDhDDszL5Zi8EauqA : Terminal Passage
  UCpbH_7H71IPKq4eH7CD5spg : Astral Throb
  UC3I2GFN_F8WudD_2jUZbojA : KEXP
*/

DELETE FROM `music` WHERE channel_id = "UCAepXw94EhaO0CZV9f5D3fQ";
DELETE FROM `music` WHERE channel_id = "UCAZ77vdqYbuGbCAWB62WbqQ";
DELETE FROM `music` WHERE channel_id = "UCD-4g5w1h8xQpLaNS_ghU4g";
DELETE FROM `music` WHERE channel_id = "UCSXm6c-n6lsjtyjvdD0bFVw";
DELETE FROM `music` WHERE channel_id = "UCxs8r_GaKqb3RUZjcmwNxIA";
DELETE FROM `music` WHERE channel_id = "UC6ghlxmJNMd8BE_u1HR-bTg";
DELETE FROM `music` WHERE channel_id = "UCbtPbB67JMa9TjlLTrOnqbQ";
DELETE FROM `music` WHERE channel_id = "UCfLFTP1uTuIizynWsZq2nkQ";
DELETE FROM `music` WHERE channel_id = "UCTjkEBD5wXS6VkmmjnLIFcg";
DELETE FROM `music` WHERE channel_id = "UCUdXKBcpjJH8v1-8Y0fYWPw";
DELETE FROM `music` WHERE channel_id = "UC8fqt_PDhDDszL5Zi8EauqA";
DELETE FROM `music` WHERE channel_id = "UCpbH_7H71IPKq4eH7CD5spg";
DELETE FROM `music` WHERE channel_id = "UC3I2GFN_F8WudD_2jUZbojA";

DELETE FROM `channels` WHERE channel_id = "UCAepXw94EhaO0CZV9f5D3fQ";
DELETE FROM `channels` WHERE channel_id = "UCAZ77vdqYbuGbCAWB62WbqQ";
DELETE FROM `channels` WHERE channel_id = "UCD-4g5w1h8xQpLaNS_ghU4g";
DELETE FROM `channels` WHERE channel_id = "UCSXm6c-n6lsjtyjvdD0bFVw";
DELETE FROM `channels` WHERE channel_id = "UCxs8r_GaKqb3RUZjcmwNxIA";
DELETE FROM `channels` WHERE channel_id = "UC6ghlxmJNMd8BE_u1HR-bTg";
DELETE FROM `channels` WHERE channel_id = "UCbtPbB67JMa9TjlLTrOnqbQ";
DELETE FROM `channels` WHERE channel_id = "UCfLFTP1uTuIizynWsZq2nkQ";
DELETE FROM `channels` WHERE channel_id = "UCTjkEBD5wXS6VkmmjnLIFcg";
DELETE FROM `channels` WHERE channel_id = "UCUdXKBcpjJH8v1-8Y0fYWPw";
DELETE FROM `channels` WHERE channel_id = "UC8fqt_PDhDDszL5Zi8EauqA";
DELETE FROM `channels` WHERE channel_id = "UCpbH_7H71IPKq4eH7CD5spg";
DELETE FROM `channels` WHERE channel_id = "UC3I2GFN_F8WudD_2jUZbojA";