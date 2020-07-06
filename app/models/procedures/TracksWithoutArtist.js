export default function (sequelize) {
  const TracksWithoutArtist = async function () {
          await sequelize.query('CALL tracks_without_artist(@out)')
    return sequelize.query('SELECT @out')

  }
  return TracksWithoutArtist;
};