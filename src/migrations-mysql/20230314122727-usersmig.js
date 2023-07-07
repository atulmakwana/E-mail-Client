const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('users', {
        userid: {
          type: Sequelize.UUID,
          primaryKey: true,
          // autoIncrement: true,
          defaultValue:Sequelize.literal('gen_random_uuid()')
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        accesstoken: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        refreshtoken: {
          type: Sequelize.STRING,
          allowNull: true,
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
    },
  };
  
  