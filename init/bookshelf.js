var knex = require('knex')(require('../db/knexfile'));

var bookshelf = require('bookshelf') (knex);

module.exports = bookshelf;