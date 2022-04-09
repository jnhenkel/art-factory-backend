const express = require('express');

const app = express();
const port = process.env.PORT || 4002;

//middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({done: true, message: 'This is the backend for the art factory'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});