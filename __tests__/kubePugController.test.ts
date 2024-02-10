import { NextFunction, Request, Response } from "express";
const kubePugController = require('../server/controllers/kubePugController.js');


describe("kubePugController", () => {

    test('two plus two is four', () => {
        expect(2 + 2).toBe(4);
    });
    // invoke our kubePugController
    
    // expect it to return next...
    
    //check the fetch

    //expect it to store res.locals.apiInfo which will...
        // be an array
        // contain objects in it
        // each object should have...
            // a group property, which is a string
            // a version property, which is a string
            // a kind property, which is a string
            // a description property, which is a string
            
})
