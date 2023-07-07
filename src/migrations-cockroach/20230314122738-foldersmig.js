const Sequelize=require('sequelize');


module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('folders', {
        folderid: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          // SERIAL:true,
          primaryKey:true
        },
        foldername: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        providerfolderid: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        // syncstate: {
        //   type: Sequelize.STRING,
        //   default:Standby,
        //   allowNull: false,
        // },
        priority: {
          type: Sequelize.INTEGER,
          default: 1,
          allowNull: false,
        },
        folderuserid: {
          type: Sequelize.UUID,
          default:Sequelize.literal('gen_random_uuid()'),
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
      await queryInterface.addIndex('folders',['providerfolderid','foldername'],{
        type:'unique',
        name:'unique_foldername_per_user'
      });
      await queryInterface.sequelize.query(
        `create type \"syncstate_enum\" as enum('standby','fetching','fetched');`
      );
      await queryInterface.sequelize.query(
        `alter table "folders" add column "syncstate" "syncstate_enum" default (syncstate_enum 'standby');`
      );
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('folders');
    },
  };
  


  // select messageid,snippet,created_at,threadid,name as email from emails join recipients on emails.id=recipients.email_id;
