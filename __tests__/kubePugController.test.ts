import { NextFunction, Request, Response } from "express";
const kubePugController = require('../server/controllers/kubePugController.js');
import { getMockReq } from '@jest-mock/express';

xdescribe("kubePugController", () => {
  test("kugePugController.getApiInfo middleware should return an apiInfo object and invoke next function", async()=>{
    // create a mock request using the jest-mock/express library, https://www.npmjs.com/package/@jest-mock/express?activeTab=code
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
            } else { // Resolve with apiInfo for further assertions  
            resolve('It doesnt matter what this string is, we just need to pass in something to resolve');
            }
        }
        // invoke the middleware
        kubePugController.getApiInfo(mockReq, mockRes, next);
    });
    //After the middleware has completed, assuming it is successful, run some assertions
    // these will only run if the middleware is correctly invoked, gets the object, stores 
    // it on locals, and invokes the next function (which is the function that returns the locals.apiInfo)
    // expect res.locals.apiInfo to be an object
    expect(typeof mockRes.locals.apiInfo).toBe('object')
    // expect nested objects, with a bunch of properties
    for(const apiObj in mockRes.locals.apiInfo){
      expect(typeof apiObj).toBe('string');
      expect(typeof mockRes.locals.apiInfo[apiObj]).toBe('object');
      expect(typeof mockRes.locals.apiInfo[apiObj].version).toBe('string');
      expect(typeof mockRes.locals.apiInfo[apiObj].replacement).toBe('object');
      expect(typeof mockRes.locals.apiInfo[apiObj].description === 'string' || typeof mockRes.locals.apiInfo[apiObj].description === 'undefined').toBe(true);
      // all of the objects have a description except for this one for some reason  
      /* {
        version: 'v1beta1',
        replacement: {
            group: 'certificates.k8s.io',
            version: 'v1',
            kind: 'CertificateSigningRequestList'
        },
        description: undefined
        } */
    };
  });
});
