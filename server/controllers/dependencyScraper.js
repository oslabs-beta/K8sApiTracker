"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
//then have our functionality below
const dependencyScraperController = {
    //define our method to get dependencies
    getDependencies: (req, res, next) => {
        // invokes glob to crawl through cwd and returns an array of yaml filenames
        const getYaml = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const options = {
                    cwd: path.resolve(__dirname, '../../../'),
                    absolute: true,
                    ignore: 'node_modules/**'
                };
                const response = yield glob('**/*.yaml', options);
                return response;
            }
            catch (e) {
                console.log('error scraping directory for yaml filepaths');
            }
        });
        getYaml()
            .then((data) => {
            try {
                //create our array to hold all of our api objects
                const dependencies = [];
                // iterate through the files
                for (const file of data) {
                    const obj = {};
                    // use fs method, to get the content from the yaml file
                    const content = fs.readFileSync(file, 'utf-8');
                    //add all properties to an object using regex to scrape yaml file for values
                    const properties = ['apiVersion', 'kind', 'name', 'namespace', 'image'];
                    const defaults = ['NA', 'NA', 'NA', 'Default', 'NA'];
                    for (let i = 0; i < properties.length; i++) {
                        try {
                            const version = new RegExp(`${properties[i]}:.*`);
                            let array = version.exec(content);
                            obj[properties[i]] = array[0];
                        }
                        catch (_a) {
                            obj[properties[i]] = defaults[i]; // if the pattern is not available, use the default
                        }
                    }
                    ;
                    dependencies.push(obj);
                }
                ;
                //save the data on locals and go to next middleware function
                res.locals.clusterData = dependencies;
                return next();
            }
            catch (err) {
                return next(err || 'There was an error sraping dependencies');
            }
        });
    }
};
module.exports = dependencyScraperController;
