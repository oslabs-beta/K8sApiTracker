import { NextFunction, Request, Response } from "express";
const dependencyScraperController = require('../server/controllers/dependencyScraper.js');
import { getMockReq } from '@jest-mock/express';

xdescribe("dependencyScraperController",() => {
    test("dependencyScraperController.getDependencies middleware should return an array of objects", async () => {
        const mockReq: Request = getMockReq();
        // create a mock response to be used when we invoke our middleware
        const mockRes: any =  {
            locals: {}
        };
        // Wrap the middleware call in a Promise to wait for next to be called
        await new Promise((resolve, reject) => {
            // define a mock next function to be used when we invoke our middleware
            const next = (err: any) => {
                if (err) { // if there is an error, we can reject, and jest will automatically know to fail the test suite
                    reject(err);
                } else { // Resolve with clusterData for further assertions  
                    resolve('It doesnt matter what this string is, we just need to pass in something to resolve');
                }
            }
            // invoke the middleware
            dependencyScraperController.getDependencies(mockReq, mockRes, next);
        });
        //After the middleware has completed, assuming it is successful, run some assertions
        // these will only run if the middleware is correctly invoked, gets the object, stores 
        // it on locals, and invokes the next function (which is the function that returns the locals.clusterData)
        // expect res.locals.clusterData to be an array
        expect(Array.isArray(mockRes.locals.clusterData)).toBe(true)
        // expect nested objects, with a bunch of properties
        for(const apiObj of mockRes.locals.clusterData){
            expect(typeof apiObj).toBe('object'); 
            expect(typeof apiObj.apiVersion).toBe('string');
            expect(typeof apiObj.kind).toBe('string');
            expect(typeof apiObj.name).toBe('string');
            expect(typeof apiObj.namespace).toBe('string');
            expect(typeof apiObj.image).toBe('string');
            expect(typeof apiObj.location).toBe('string');
        };
    }, 20000)
});