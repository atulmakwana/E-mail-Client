const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {


      // recipientid INT NOT NULL AUTO_INCREMENT,

      await queryInterface.sequelize.query(
       `CREATE TABLE recipients (
        recipientid PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        email_id INTEGER NOT NULL,
        type ENUM('from','to', 'cc', 'bcc') NOT NULL,
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
  