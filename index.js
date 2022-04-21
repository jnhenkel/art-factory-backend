const express = require('express');
var cors = require('cors');
const { store } = require('./data/store');

const app = express();
const port = process.env.PORT || 4002;

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({done: true, message: 'This is the backend for the art factory123'});
});


app.post('/register', (req,res) => {
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    store.addCustomer(email, firstName, password)
    .then(x => res.status(200).json({done: true, message: 'The user has been added successfully.'}))
    .catch(e => {
        console.log(e);
        res.status(500).json({done: false, message: 'the user was not added due to an error.'});
    });
});

app.post('/login', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    store.login(email,password)
    .then(x => {
        if (x.valid) {
            res.status(200).json({done: true, message: 'User logged in successfully.'});
        } else {
            res.status(401).json({done: false, message: x.message});
        }
    })
    .catch(e => {
        console.log(e);
        res.status(500).json({done: false, message: 'There was an error'});
    });
});

app.post('/score', (req,res) => {
    let email = req.body.email;
    let score = req.body.score;
    let date = new Date();
    date = date.toDateString();
    store.postScore(email,score,date)
    .then(x => {
        if (x.done) {
        res.status(200).json({ done: true, message: 'score added' });
        } else {
            res.status(500).send();
        }
    })
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});