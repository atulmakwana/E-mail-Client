const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {

      await queryInterface.sequelize.query(
        `create type \"emailtype_enum\" as enum('from','to','cc','bcc');`
      );
      await queryInterface.sequelize.query(
       `CREATE TABLE recipients (
        recipientid SERIAL PRIMARY KEY,
        email STRING NOT NULL,
        email_id INTEGER NOT NULL,
        emailtype emailtype_enum NOT NULL,
        FOREIGN KEY (email_id) REFERENCES emails(id) ON DELETE CASCADE ON UPDATE CASCADE );`
      ).then(() => {
        console.log('recipients Tabale created succesfully...');
      }).catch(err => {
        console.error("Error occured at table creation recipients : ",err);
      });

    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('recipients');
    },
  };
  