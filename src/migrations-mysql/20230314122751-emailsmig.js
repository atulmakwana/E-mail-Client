const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('emails', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          primaryKey:true
        },
        bodytext: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        bodyhtml: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        threadid: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        messageid: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        snippet:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        is_read:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_archieved:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_replyto:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_trashed:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        emailuserid: {
          type: Sequelize.INTEGER,
          allowNull:false,
          name:'emails_users_fk',
          references: {
            model:'users',
            key:'userid'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeContraint('emails','emailuserid')
      await queryInterface.dropTable('emails');
    },
  };
  