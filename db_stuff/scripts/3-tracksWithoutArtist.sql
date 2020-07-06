-- Find any track that does not have artist and update it with the user name, only tracks without artist if you modify other tracks you screw up.
-- SOURCE /docker-entrypoint-initdb.d/bd_musica.sql;
USE bquate_test_musica;
DROP PROCEDURE IF EXISTS tracks_without_artist;
DELIMITER //
CREATE PROCEDURE tracks_without_artist(out list_tracks varchar(255))
BEGIN

   DECLARE tracksWithoutArtistID INT;
   DECLARE tracksWithoutArtistAlbumID INT;
   DECLARE lostArtist varchar(255);
   DECLARE tracksWithoutArtistCount INT DEFAULT 0;

   SET tracksWithoutArtistCount = 0;
   SET list_tracks = '';
   SELECT COUNT(*) INTO tracksWithoutArtistCount FROM tracks WHERE artist IS NULL;
   FOR_EACH_TRACK:  LOOP
		IF tracksWithoutArtistCount <= 0 THEN 
			LEAVE  FOR_EACH_TRACK;
		END  IF;

      SELECT tracks.albumid, tracks.id, albums.artist INTO tracksWithoutArtistAlbumID, tracksWithoutArtistID, lostArtist
         FROM tracks 
         JOIN albums ON albums.id = tracks.albumid
         WHERE tracks.artist IS NULL LIMIT 1;
      UPDATE tracks SET tracks.artist=lostArtist 
         WHERE id = tracksWithoutArtistID;
      SET tracksWithoutArtistCount = tracksWithoutArtistCount - 1;
      SET list_tracks = CONCAT(list_tracks,',',tracksWithoutArtistID);
	END LOOP;
   SET list_tracks = SUBSTRING(list_tracks,2);
END //
DELIMITER ;