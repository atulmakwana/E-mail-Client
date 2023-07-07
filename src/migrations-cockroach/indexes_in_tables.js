const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {

      await queryInterface.addIndex('users',['email']),
      await queryInterface.addIndex('folders',['foldername']),
      await queryInterface.addIndex('emails',['subject'])

    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('recipients');
    },
  };
  