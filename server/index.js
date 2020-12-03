const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'src', 'index.html'));
});

app.listen(process.env.PORT, () =>
    console.log(`Server is up and running at port: ${process.env.PORT}`)
);
