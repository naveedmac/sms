const knexConfig = require('../knexfile')[
  process.env.NODE_ENV || 'development'
];
const kx = require('knex')(knexConfig);

// const kx = require('knex')({
//   client: 'pg',
//   connection: {
//     database: 'edi_processor_dev'
//   }
// });
kx.on('query', query => {
  console.log(query.sql);
  console.log(query.bindings);
});

module.exports = kx;
