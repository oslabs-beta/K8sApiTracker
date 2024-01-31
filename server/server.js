const path = require('path');
const express = require('express');

const clusterController = require('./controllers/clusterController.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/',
    clusterController.kubectlController,
    (req, res) => {
        console.log(`Inside of GET '/' route`);
        res.status(200).sendFile(path.resolve(__dirname, "../index.html"))
    });


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const defaultErr = {
        log: "Global err handler, unkonwn middleware error",
        status: 500,
        message: "Unknown server error. Please try again"
    };
    const errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;