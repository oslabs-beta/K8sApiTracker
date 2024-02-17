const path = require('path');
const express = require('express');
import { Request, Response } from 'express';
import { Error } from './types'
const kubePugController = require('./controllers/kubePugController.js');
const compareController = require('./controllers/compareController.js');
const dependencyScraperController = require('./controllers/dependencyScraper.js');
const helmController = require('./controllers/helmController.js');
const compareControllerHelm = require('./controllers/compareControllerHelm.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/dependencies',
    dependencyScraperController.getDependencies, // This is our repo scraping middleware, outputs the same thing as the kubectlGetAll middleware
    kubePugController.getApiInfo,
    compareController.compare,
    (req: Request, res: Response) => {
        res.status(200).json(res.locals.clusterData);
    });


app.post('/helm',
    helmController.getUserInput,
    kubePugController.getApiInfo,
    compareControllerHelm.compare,
    (req: Request, res: Response) => {
        res.status(200).json(res.locals.helmData);
    })

// Catch All Handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).send('Page Not Found');
});

// GLOBAL ERROR HANDLER 
app.use((err: Error, req: Request, res: Response) => {
    const defaultErr: Error = {
        log: 'Global err handler, unkonwn middleware error',
        status: 500,
        message: 'Unknown server error. Please try again'
    };
    const errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});

const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
