const express = require('express');

const app = express();
const port = process.env.PORT || 4002;

//middlewares
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});