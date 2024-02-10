const request = require('supertest');
const express = require('express');
const server = 'http://localhost:3000';

const app = express();
// app.use('/', router);

describe('dependencies', () => {
    // start a server

     

    test("a get request to /dependencies should return an array of dependency object", ()=>{
        // make a fetch request to /dependencies
        return request(server)
            .get('/dependencies')
            .expect(200)
            .expect('Content-Type', /json/)
            // .then((data: any) => data.json())
            .then((data: any) =>{ 
                let content = data.body
                // expect data to be an array
                expect(Array.isArray(content)).toBe(true)
                //expect it to contain nested objects, with the following properties
                    //apiversion
                    //kind
                    //name
                    //namespace
                    //image
                    //location
                    //newversion
                    //deprecation status
                    //description
            })
    })


    // terminate the server

})


//things we need to test
    // server sends static files
    // catch all route handler works
    // error handler works
    // for later, we can maybe have the tests start the server and then close the server down so the user doesnt have to do it manually