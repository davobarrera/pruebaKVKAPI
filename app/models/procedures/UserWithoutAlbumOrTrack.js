export default function (sequelize) {
  const UserWithoutAlbumOrTrack = async function () {
          await sequelize.query('CALL user_without_album_or_track(@out)')
    return sequelize.query('SELECT @out')

  }
  return UserWithoutAlbumOrTrack;
};