"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//then have our functionality below
var dependencyScraperController = {
    //define our method to get dependencies
    getDependencies: function (req, res, next) {
        console.log('getDependencies invoked');
        //functionality
        return next();
    }
};
module.exports = dependencyScraperController;
