const mongoose = require('mongoose');
const winston = require('../util/logger');

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const db = process.env.DB_NAME

const conn = `mongodb+srv://${ user }:${ pass }@${ host }/${ db }?retryWrites=true&w=majority`


// if (process.env.NODE_ENV === 'production') {
//   connectionString = `mongodb://${config.get('dbConfig.username')}:\
//     ${'dbConfig.password'}@${config.get('dbConfig.host')}:\
//     ${config.get('dbConfig.port')}/${config.get('dbConfig.database')}`;
// }

mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        // console.log(conn)
        console.log(err)
        winston.error(`Mongo is facing database connectivity issue. Please check for database health in Mongo Atlas.`);
        process.exit(1);
    });
