const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {

      await queryInterface.sequelize.query(
       `CREATE TABLE attachments (
        attachmentid SERIAL PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        file_size INTEGER,
        file_type VARCHAR(255),
        file_path VARCHAR(255),
        emailid INT NOT NULL,
        FOREIGN KEY (emailid) REFERENCES emails(id) ON DELETE CASCADE ON UPDATE CASCADE );`
      ).then(() => {
        console.log('attachments Tabale created succesfully...');
      }).catch(err => {
        console.error("Error occured at table creation attachments : ",err);
      });

    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('attachments');
    },
  };
  