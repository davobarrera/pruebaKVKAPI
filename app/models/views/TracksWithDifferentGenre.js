export default function (sequelize, Sequelize) {
  const { QueryTypes } = Sequelize;
  const TracksWithDifferentGenre = function() {
      return sequelize.query('SELECT * FROM tracks_with_different_genre', {
        type: QueryTypes.SELECT
      });
    }
    return TracksWithDifferentGenre;
};