"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var express = require('express');
var clusterController = require('./controllers/clusterController.js');
var kubePugController = require('./controllers/kubePugController.js');
var compareController = require('./controllers/compareController.js');
var fauxDataController = require('./controllers/fauxDataController.js');
var dependencyScraperController = require('./controllers/dependencyScraper.js');
var app = express();
var PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/dependencies', clusterController.kubectlGetAll, 
//dependencyScraperController.getDependencies, // This is our repo scraping middleware, outputs the same thing as the kubectlGetAll middleware
fauxDataController.getFauxData, kubePugController.getApiInfo, compareController.compare, function (req, res) {
    res.status(200).json(res.locals.clusterData);
});
app.get('/info', kubePugController.getApiInfo, function (req, res) {
    return res.status(200).json(res.locals.apiInfo);
});
app.get('/test', dependencyScraperController.getDependencies, function (req, res) {
    return res.status(200).json(res.locals.clusterData);
});
// Catch All Handler
app.use('*', function (req, res, next) {
    res.status(404).send('Page Not Found');
});
// GLOBAL ERROR HANDLER 
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Global err handler, unkonwn middleware error',
        status: 500,
        message: 'Unknown server error. Please try again'
    };
    var errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});
app.listen(PORT, function () {
    console.log("Listening on port: ".concat(PORT));
});
module.exports = app;
