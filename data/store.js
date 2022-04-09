const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString =
    `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;

console.log(connectionString);
const connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl: { rejectUnauthorized: false }
}
const pool = new Pool(connection);

let store = {
    addCustomer: (email, firstName,  password) => {
        const hash = bcrypt.hashSync(password, 10);
        return pool.query('insert into art_factory.users (email, name, password) values ($1, $2, $3)', [email, firstName, hash]);
        //users.push({ 'firstName': firstName, 'email': email, 'password': hash });
    },

    findUserInfo: (email, password) => {
        let result = users.find(db =>
            (email.toLowerCase() == db.email.toLowerCase() || email.toLowerCase() == db.email.toLowerCase()) && password == db.password
        );
        return result;
    }
}

module.exports = { store };