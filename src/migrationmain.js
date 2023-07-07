// const { Umzug, SequelizeStorage } = require('umzug');
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('emailclient5', 'root', 'admin', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// const umzug = new Umzug({
//   migrations: { glob: './migrations/*.js' },
//   context: sequelize.getQueryInterface(),
//   storage: new SequelizeStorage({ sequelize }),
//   logger: console,
// });

// async function migrate() {
//   try {
//     await umzug.up();
//     console.log('Migration complete!');
//   } catch (error) {
//     console.error('Error running migration:', error);
//   }
// }

// migrate();





//running through the cockroachdb 

const { Client } = require('pg');
const { Umzug, SequelizeStorage } = require('umzug');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('emailclientcockroachdb', 'atul', 'atul', {
  host: 'localhost',
  dialect: 'postgres',
  port:26257,
  dialectOptions: {
    ssl:{
      rejectUnauthorized:false
    }
  }
});

const umzug = new Umzug({
  migrations: { glob: './migrations-cockroach/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function migrate() {
  try {
    await umzug.up();
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error running migration:', error);
  }
}

migrate();
