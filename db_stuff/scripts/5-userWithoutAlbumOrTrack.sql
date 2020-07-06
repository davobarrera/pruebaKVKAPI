-- Set status 0 to any user which not have track or albums and show them
-- SOURCE /docker-entrypoint-initdb.d/bd_musica.sql;
USE bquate_test_musica;
DROP PROCEDURE IF EXISTS user_without_album_or_track;
DELIMITER //
CREATE PROCEDURE user_without_album_or_track(out list_users varchar(255))
BEGIN

   DECLARE userWithoutAlbumOrTracksCount INT DEFAULT 0;
   -- SELECT users.status, users.id FROM users
   --     LEFT JOIN tracks on tracks.userid = users.id 
   --     LEFT JOIN albums on albums.userid = users.id 
   --     WHERE tracks.id is NULL OR albums.id is NULL;
   SET list_users = '';
   SELECT GROUP_CONCAT(users.id SEPARATOR ','), COUNT(users.id )INTO list_users , userWithoutAlbumOrTracksCount FROM users
       LEFT JOIN tracks on tracks.userid = users.id 
       LEFT JOIN albums on albums.userid = users.id 
       WHERE tracks.id is NULL OR albums.id is NULL;
   UPDATE users SET status=0 WHERE FIND_IN_SET(id,list_users);
   -- SELECT users.status, users.id FROM users
   --     LEFT JOIN tracks on tracks.userid = users.id 
   --     LEFT JOIN albums on albums.userid = users.id 
   --     WHERE tracks.id is NULL OR albums.id is NULL;
END //
DELIMITER ;