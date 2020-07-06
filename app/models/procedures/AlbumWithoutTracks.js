export default function (sequelize) {
  const AlbumWithoutTracks = async function () {
          await sequelize.query('CALL albums_without_tracks(@out)')
    return sequelize.query('SELECT @out')

  }
  return AlbumWithoutTracks;
};