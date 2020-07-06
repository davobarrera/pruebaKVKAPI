-- List all tracks that here genre is different to genre of here album
USE bquate_test_musica;
CREATE OR REPLACE VIEW bquate_test_musica.tracks_with_different_genre AS
    SELECT 
        albums.id AS album_id,
        tracks.id AS track_id,
        albums.title AS album_title,
        tracks.title AS track_title,
        albums.genre AS album_genre,
        tracks.genre AS track_genre
        FROM albums
        JOIN tracks ON tracks.albumid = albums.id 
        WHERE albums.genre not like tracks.genre;