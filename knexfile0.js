const sharedConfig = {
  client: 'postgresql',
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
};

module.exports = {
  development: {
    client: 'postgresql',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    // ...sharedConfig, // 👈 Will add all properties of sharedConfig to its parent object
    connection: {
      database: 'edi_processor_dev'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    // ...sharedConfig, // 👈 Will add all properties of sharedConfig to its parent object
    connection: {
      database: 'edi_processor_sta'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    // ...sharedConfig, // 👈 Will add all properties of sharedConfig to its parent object
    connection: {
      // database: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
