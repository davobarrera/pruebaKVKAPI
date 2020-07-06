export default function (sequelize, Sequelize) {
    const tracks = sequelize.define("tracks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      isrc: {
        type: Sequelize.STRING
      },
      albumid: {
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING
      },
      userid: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      }
    });
  
    return tracks;
  };