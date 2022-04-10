const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');
require('dotenv').config();
console.log(process.env);
const connectionString = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;
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
            return {valid: false, message: 'There was an error checking email.'};
        });
    }
}

module.exports = { store };