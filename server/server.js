const path = require('path');
const express = require('express');

const clusterController = require('./controllers/clusterController.js');
const kubePugController = require('../server/controllers/kubePugController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));


app.get('/dependencies',
    clusterController.kubectlGetAll,
    (req, res) => {
        console.log(`Inside of GET '/' route`);
        console.log(res.locals.clusterData);
        res.status(200).json(res.locals.clusterData);
        // res.status(200).sendFile(path.resolve(__dirname, "../index.html"))
        // res.(200);
    });

app.get('/info', kubePugController.getApiInfo, (req, res) => {
    return res.status(200).json(res.locals.apiInfo);
})
// Catch All Handler
app.use('*', (req, res, next) => {
    res.status(404).send('Page Not Found');
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Global err handler, unkonwn middleware error',
        status: 500,
        message: 'Unknown server error. Please try again'
    };
    const errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
