export default function (sequelize, Sequelize) {
    const Albums = sequelize.define("albums", {
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
      label: {
        type: Sequelize.STRING
      },
      upc: {
        type: Sequelize.STRING
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
  
    return Albums;
  };