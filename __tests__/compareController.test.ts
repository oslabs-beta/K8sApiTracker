import { NextFunction, Request, Response } from "express";
const compareController = require('../server/controllers/compareController.js');
import { getMockReq } from '@jest-mock/express';

xdescribe("compareController", () => {
    test("compareController.compare middleware takes in res.locals.apiInfo and res.locals.clusterData and should return an of objects on res.locals.clusterData", async() => {
        const mockReq: Request = getMockReq();
        // create a mock response to be used when we invoke our middleware
        const mockRes: any =  {
            locals: { // mocked data as inputs in res.locals
                apiInfo: {
                    test1: { 
                        version:'test1',
                        replacement: {},
                        description: 'test1'
                    },
                    test2: { 
                        version:'test2',
                        replacement: {
                            group:"test2",
                            version:"test2",
                            kind:"test2"
                        },
                        description: 'test2'
                    },
                },
                clusterData: [
                    { // this is a sample api object that is removed
                        apiVersion: 'test1',
                        kind: 'test1',
                        name: 'test1',
                        nameSpace: 'test1',
                        image: 'test1',
                        location: 'test1'
                    },
                    { // this is a sample api object that has an available update
                        apiVersion: 'test2',
                        kind: 'test2',
                        name: 'test2',
                        nameSpace: 'test2',
                        image: 'test2',
                        location: 'test2'
                    },
                    { // this is a sample api object that is stable (is not in the apiInfo object at all)
                        apiVersion: 'test3',
                        kind: 'test3',
                        name: 'test3',
                        nameSpace: 'test3',
                        image: 'test3',
                        location: 'test3'
                    },   
                ]
            }
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
            compareController.compare(mockReq, mockRes, next);
        });
        // define what we expect our result to look like given the mocked data above
        const expectedResult = [
            {
                apiVersion: 'test1',
                kind: 'test1',
                name: 'test1',
                nameSpace: 'test1',
                image: 'test1',
                location: 'test1',
                newVersion: false,
                description: 'test1',
                deprecationStatus: 'removed'
            },
            {
                apiVersion: 'test2',
                kind: 'test2',
                name: 'test2',
                nameSpace: 'test2',
                image: 'test2',
                location: 'test2',
                newVersion: 'test2',
                description: 'test2',
                deprecationStatus: 'updateAvailable'
            },
            {
                apiVersion: 'test3',
                kind: 'test3',
                name: 'test3',
                nameSpace: 'test3',
                image: 'test3',
                location: 'test3',
                newVersion: false,
                description: false,
                deprecationStatus: 'stable'
            }
        ]
        // make sure the result is the same as our expected data
        expect(mockRes.locals.clusterData).toEqual(expectedResult);
    });
});
