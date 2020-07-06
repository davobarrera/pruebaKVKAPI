-- Create a View that lists all tracks with id, title, title of the album to which itbelongs, email and country of origin of the user.
USE bquate_test_musica;
CREATE OR REPLACE VIEW bquate_test_musica.all_tracks AS
  SELECT 
    tracks.id AS trackID,
    tracks.title as title,
    albums.title AS album,
    users.email as email,
    country.name AS country 
    FROM tracks 
    JOIN users ON users.id = tracks.userid
    JOIN albums ON albums.id = tracks.albumid
    JOIn country ON country.code = users.countrycode;