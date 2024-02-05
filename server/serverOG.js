const path = require('path');
const express = require('express');

const clusterController = require('./controllers/clusterController.js');
const kubePugController = require('./controllers/kubePugController.js');
const compareController = require('./controllers/compareController.js');
const fauxDataController = require('./controllers/fauxDataController.js');
const dependencyScraperController = require('./controllers/dependencyScraperOG.js');
const dependencyScraperControllerTest = require('./controllers/dependencyScraperTest.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));


app.get('/dependencies',
    clusterController.kubectlGetAll,
    //dependencyScraperController.getDependencies, // This is our repo scraping middleware, outputs the same thing as the kubectlGetAll middleware
    fauxDataController.getFauxData,
    kubePugController.getApiInfo,
    compareController.compare,
    (req, res) => {
        res.status(200).json(res.locals.clusterData);
    });

app.get('/info', kubePugController.getApiInfo, (req, res) => {
    return res.status(200).json(res.locals.apiInfo);
})

app.get('/test', 
    dependencyScraperControllerTest.getDependencies, 
    (req, res)=>{
        return res.status(200).json(res.locals.clusterData);
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
