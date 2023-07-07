const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('users', {
        userid: {
          type: Sequelize.UUID,
          primaryKey: true,
          // autoIncrement: true,
          allowNull:false,
          family:'usertokens',
          defaultValue:Sequelize.literal("gen_random_uuid()")
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
          family:'usertokens'
        },
        refreshtoken: {
          type: Sequelize.STRING,
          allowNull: true,
          family:'usertokens'
        },
        expirytime: {
          type: Sequelize.INTEGER,
          allowNull: true,
          family:'usertokens'
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
    },
  };
  
  