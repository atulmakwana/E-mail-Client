const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {

      await queryInterface.sequelize.query(
        `CREATE TABLE usertopics(
          id STRING PRIMARY KEY,
          tenant STRING
        );`
      ).then(() => {
        console.log('usertopics Tabale created succesfully...');
      }).catch(err => {
        console.error("Error occured at table creation usertopics : ",err);
      });

    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('usertopics');
    },
  };
  