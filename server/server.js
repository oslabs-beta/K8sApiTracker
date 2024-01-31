const express = require('express');
const path = require('path');
const kubePugController = require('../server/controllers/kubePugController');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
 
app.get('/apiInfo',kubePugController.getApiInfo, (req, res) => {
    res.status(200);
} )
app.listen(3000, () => {
  console.log('Hello there, server is running on port 3000');
});