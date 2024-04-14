import path from 'path';
import express from 'express';
import { Request, Response, Express } from 'express';
import { Error } from './types'
import kubePugController from './controllers/kubePugController.js';
import compareController from './controllers/compareController.js';
import dependencyScraperController from './controllers/dependencyScraper.js';
import helmController from './controllers/helmController.js';
import compareControllerHelm from './controllers/compareControllerHelm.js';

const app: Express = express();
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

export default server;
