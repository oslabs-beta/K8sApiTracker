// const { glob } = require('glob');
// const fs = require('fs');
import { Request, Response, NextFunction, RequestHandler } from 'express';

//define all of our types here
//define our get dependencies functions types
type GetDependencies = (req: Request, res: Response, next: NextFunction) => void

//define all of our larger controller's types
type DependencyScraperController = {
    getDependencies: GetDependencies;
}

//then have our functionality below
const dependencyScraperController: DependencyScraperController = {
    //define our method to get dependencies
    getDependencies: (req: Request, res: Response, next: NextFunction): void => {
        console.log('getDependencies invoked');
        //functionality
        return next()
    }    
};

module.exports = dependencyScraperController;