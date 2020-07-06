
-- List all albums from Peru that which genre is ROCK.
USE bquate_test_musica;
CREATE OR REPLACE VIEW bquate_test_musica.peruLovesRock AS
  SELECT DISTINCT 
    albums.id AS albumID,
    albums.title AS album,
    country.name AS country,
    albums.genre AS genre
    FROM tracks 
    JOIN users ON users.id = tracks.userid
    JOIN albums ON albums.id = tracks.albumid
    JOIN country ON country.code = users.countrycode
    WHERE users.countrycode like 'PE'
    AND albums.genre like 'ROCK';