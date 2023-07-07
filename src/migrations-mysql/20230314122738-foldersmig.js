const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('folders', {
        folderid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          primaryKey:true
        },
        foldername: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        providerfolderid: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        folderuserid: {
          type: Sequelize.INTEGER,
          allowNull:false,
          name:'folders_users_fk',
          references: {
            model:'users',
            key:'userid'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('folders');
    },
  };
  