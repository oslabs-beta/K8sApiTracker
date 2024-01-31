const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
    console.log('Hello there, server is running on port 3000');
});