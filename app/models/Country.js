export default function (sequelize, Sequelize) {
    const country = sequelize.define("country", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      }
    },{tableName: "country"});
  
    return country;
  };