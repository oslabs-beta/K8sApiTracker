import { NextFunction, Request, Response } from "express";
const kubePugController = require('../server/controllers/kubePugController.js');
import { getMockReq } from '@jest-mock/express';

describe("kubePugController", () => {

  test("checking kugepug Controller", async()=>{
    // create a mock request using the jest-mock/express library
    const mockReq: Request = getMockReq();
    // create a mock response
    const mockRes: any =  {
      locals: {}
    };
    //create a mock next object
    const mockNext = jest.fn();
    
    // Wrap the middleware call in a Promise to wait for next to be called
    await new Promise((resolve, reject) => {
      kubePugController.getApiInfo(mockReq, mockRes, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(mockRes.locals.apiInfo); // Resolve with apiInfo for potential further assertions
        }
      });
    });
    //After the middleware has completed, print the res.locals.apiInfo
    console.log(mockRes.locals.apiInfo);
    })
  })

    //check the fetch
    //expect it to store res.locals.apiInfo which will...
        // be an array
        // contain objects in it
        // each object should have...
            // a group property, which is a string
            // a version property, which is a string
            // a kind property, which is a string
            // a description property, which is a string