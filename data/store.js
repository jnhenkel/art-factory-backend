const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');
require('dotenv').config();

const connectionString = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;


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
    },

    login: (email, password) => {
        return pool.query('select * from art_factory.users where email = $1', [email])
        .then(x => {
            if (x.rows.length == 1) {
                let valid = bcrypt.compareSync(password, x.rows[0].password);
                if (valid) {
                    return {valid: true};
                } else {
                    return {valid: false, message: 'Credentials are not valid.'};
                } 
            } else {
                return {valid: false, message: 'Email not found'};
            }
        })
        .catch(e => {
            console.log(e);
            return {valid: false, message: 'There was an error checking credentials.'};
        });
    },

    postScore: (email, score, date) => {
        let query = `select u.id as user_id from art_factory.users u where u.email = $1`;
        pool.query(query, [email])
        .then(x => {
            if (x.rows.length > 0) {
                let user_id = x.rows[0].user_id;
                let query2 = `insert into art_factory.score (user_id, date, score) values ($1, $2, $3)`;
                return pool.query(query2, [Number(user_id), date, score])
            }

        })
    }
}

module.exports = { store };