export default function (sequelize, Sequelize) {
  const { QueryTypes } = Sequelize;
  const AllAlbumsFromPeru = function() {
      return sequelize.query('SELECT * FROM peruLovesRock', {
        type: QueryTypes.SELECT
      });
    }
    return AllAlbumsFromPeru;
};