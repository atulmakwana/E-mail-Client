const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {

      await queryInterface.sequelize.query(
        `CREATE TABLE emailfolder_association (
          folderid INTEGER NOT NULL,
          emailid INTEGER NOT NULL,
          PRIMARY KEY (folderid,emailid),
          FOREIGN KEY (folderid) REFERENCES folders (folderid) ON UPDATE CASCADE ON DELETE CASCADE,
          FOREIGN KEY (emailid) REFERENCES emails (id) ON DELETE CASCADE ON UPDATE CASCADE );`
      ).then(() => {
        console.log('emailfolder_join Tabale created succesfully...');
      }).catch(err => {
        console.error("Error occured at table creation emailfolder_association : ",err);
      });

    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('emailfolder_association');
    },
  };
  