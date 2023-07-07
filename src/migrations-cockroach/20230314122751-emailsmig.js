const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('emails', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          // SERIAL:true,
          primaryKey:true
        },
        //   type: Sequelize.UUID,
        //   primaryKey: true,
        //   allowNull:false,
        //   defaultValue:Sequelize.literal("gen_random_uuid()")
        // },
        bodytext: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        bodyhtml: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        subject: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        threadid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        messageid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        snippet:{
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        is_read:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        is_archieved:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        is_reply:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        replyto:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        is_trashed:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        emailuserid: {
          type: Sequelize.UUID,
          default:Sequelize.literal('gen_random_uuid()'),
          allowNull:true,
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
  