-- Set status 0 to any album which not have tracks and show them
-- SOURCE /docker-entrypoint-initdb.d/bd_musica.sql;
USE bquate_test_musica;
DROP PROCEDURE IF EXISTS albums_without_tracks;
DELIMITER //
CREATE PROCEDURE albums_without_tracks(out list_albums varchar(255))
BEGIN

   DECLARE albumsWithoutTracksCount INT DEFAULT 0;
   -- SELECT albums.status FROM albums
   --     LEFT JOIN tracks on tracks.albumid = albums.id 
   --     WHERE tracks.id is NULL;
   SET list_albums = '';
   SELECT GROUP_CONCAT(albums.id SEPARATOR ','), COUNT(albums.id )INTO list_albums , albumsWithoutTracksCount FROM albums
       LEFT JOIN tracks on tracks.albumid = albums.id 
       WHERE tracks.id is NULL;
   UPDATE albums SET status=0 WHERE FIND_IN_SET(id,list_albums);
   -- SELECT albums.status FROM albums
   --     LEFT JOIN tracks on tracks.albumid = albums.id 
   --     WHERE tracks.id is NULL;
END //
DELIMITER ;