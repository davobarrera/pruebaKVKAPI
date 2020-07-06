export default function (sequelize, Sequelize) {
  const { QueryTypes } = Sequelize;
  const AllTracksView = function() {
      return sequelize.query('SELECT * FROM all_tracks', {
        type: QueryTypes.SELECT
      });
    }
    return AllTracksView;
};