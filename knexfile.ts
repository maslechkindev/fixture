import config from './src/config';

const connection = {
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  user: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE,
};

module.exports = {
  client: 'pg',
  connection: connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
