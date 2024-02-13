const path = require('path');
const express = require('express');
import { Request, Response, NextFunction } from 'express';

// const clusterController = require('./controllers/clusterController.js');
const kubePugController = require('./controllers/kubePugController.js');
const compareController = require('./controllers/compareController.js');
const dependencyScraperController = require('./controllers/dependencyScraper.js');
const helmController = require('./controllers/helmController.js');

const app = express();
const PORT = 3000;

// define types for custom errors
type Error = {
    log: string,
    status: number,
    message: string
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/dependencies',
    // clusterController.kubectlGetAll,
    dependencyScraperController.getDependencies, // This is our repo scraping middleware, outputs the same thing as the kubectlGetAll middleware
    kubePugController.getApiInfo,
    compareController.compare,
    (req: Request, res: Response) => {
        res.status(200).json(res.locals.clusterData);
    });


app.get('/helm',
    helmController.getUserInput,
    (req: Request, res: Response, next: NextFunction) => {
        console.log('Inside of /helm GET route');
        console.log(res.locals.helmData);
        res.status(200).json(res.locals.helmData);
    })

// Catch All Handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Page Not Found');
});

// GLOBAL ERROR HANDLER 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: Error = {
        log: 'Global err handler, unkonwn middleware error',
        status: 500,
        message: 'Unknown server error. Please try again'
    };
    const errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});

let server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
