const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
import { Request, Response, NextFunction, RequestHandler } from 'express';

//define all of our types here
//define our get dependencies functions types
type GetDependencies = (req: Request, res: Response, next: NextFunction) => void

//define all of our larger controller's types
type DependencyScraperController = {
    getDependencies: GetDependencies;
}
// define types for our api objects that go within our api array  
type ApiObj = Record<string, string>

//then have our functionality below
const dependencyScraperController: DependencyScraperController = {
    //define our method to get dependencies
    getDependencies: (req: Request, res: Response, next: NextFunction): void => {
        // invokes glob to crawl through cwd and returns an array of yaml filenames
        const getYaml = async () => {
            try {
                const options = {
                  cwd: path.resolve(__dirname, '../../../'),
                  absolute: true,
                  ignore: 'node_modules/**'
                };
                const response = await glob('**/*.yaml', options);
                console.log(response);
                return response;
              }
              catch(e) {
                  console.log('error')
              }
        };

        getYaml()
        .then((data) => {
            try {
                //create our array to hold all of our apis
                const dependencies = [];
                // iterate through the files, and create an object for each api
                for(const file of data) {
                    const obj: ApiObj = {};
                    // use fs method, to get the content from the yaml file
                    const content = fs.readFileSync(file, 'utf-8');                
                    //add all properties to an object using regex to scrape yaml file for values
                    const properties = ['apiVersion', 'kind', 'name', 'namespace', 'image'];
                    const defaults = ['NA', 'NA', 'NA', 'Default', 'NA'];
                    for (let i = 0; i < properties.length; i++){
                        try {
                            const version = new RegExp(`${properties[i]}:.*`);
                            let array = version.exec(content);
                            obj[properties[i]] = array[0];                        
                        }
                        catch {
                            obj[properties[i]] = defaults[i]; // if the pattern is not available, use the default
                        }
                    };
                    dependencies.push(obj);
                };
                //save the data on locals and go to next middleware function
                res.locals.clusterData = dependencies;
                return next();                   
            }
            catch (err){
                return next(err || 'There was an error sraping dependencies');
            }   
        })   
    }    
};

module.exports = dependencyScraperController;
