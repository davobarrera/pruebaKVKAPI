
import Sequelize from 'sequelize'
import Album from '../models/Album.js'
import Track from '../models/Track.js'
import User from '../models/User.js'
import Country from '../models/Country.js'
import AllTracksView from '../models/views/AllTracksView.js'
import AllAlbumsFromPeru from '../models/views/AllAlbumsFromPeru.js'
import TracksWithDifferentGenre from '../models/views/TracksWithDifferentGenre.js'
import TracksWithoutArtist from '../models/procedures/TracksWithoutArtist.js'
import AlbumWithoutTracks from '../models/procedures/AlbumWithoutTracks.js'
import UserWithoutAlbumOrTrack from '../models/procedures/UserWithoutAlbumOrTrack.js'
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $lt: Op.lt,
  $gt: Op.gt,
  $like: Op.like,

};
export default async function ({ config, DI: { models } }) {
  console.log('Loading Sequelize...');
  let cont = 0;
  while (cont < 120) {
    await sleep(500)
    const conn = new Sequelize(config.db_database, config.db_user, config.db_pwd, {
      host: config.db_host,
      dialect: 'mysql',
      define: {
        timestamps: false
      },
      operatorsAliases
    });
    if (await hasConnection(conn)) {
      console.log('Connection has been established successfully.');
      loadModels(models, conn, Sequelize);
      break;
    } else {
      cont++;
    }

  }
}

async function hasConnection(sequelize) {
  try {
    await sequelize.authenticate();
    return true
  } catch (error) {
    // console.error('Unable to connect to the database:', error);
    return false;
  }
}

function loadModels(models, conn, Sequelize) {
  loadSingleModel(models, conn, Sequelize, Album, 'Album');
  loadSingleModel(models, conn, Sequelize, Track, 'Track');
  loadSingleModel(models, conn, Sequelize, User, 'User');
  loadSingleModel(models, conn, Sequelize, Country, 'Country');
  loadSingleModel(models, conn, Sequelize, AllTracksView, 'AllTracksView');
  loadSingleModel(models, conn, Sequelize, AllAlbumsFromPeru, 'AllAlbumsFromPeru');
  loadSingleModel(models, conn, Sequelize, TracksWithoutArtist, 'TracksWithoutArtist');
  loadSingleModel(models, conn, Sequelize, AlbumWithoutTracks, 'AlbumWithoutTracks');
  loadSingleModel(models, conn, Sequelize, UserWithoutAlbumOrTrack, 'UserWithoutAlbumOrTrack');
  loadSingleModel(models, conn, Sequelize, TracksWithDifferentGenre, 'TracksWithDifferentGenre');
}

function loadSingleModel(models, conn, Sequelize, model, modelName) {
  process.stdout.write(`Loading  model ${modelName} ... `);
  models[modelName] = model(conn, Sequelize)
  process.stdout.write("Done!!!\n");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}