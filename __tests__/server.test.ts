const request = require('supertest');
const server  = require('../server/server.ts'); 

describe('dependencies', () => {
    
    test("a get request to /dependencies should return an array of dependency object", ()=>{
        // make a fetch request to /dependencies
        return request(server)
        .get('/dependencies')
        .expect(200)
        .expect('Content-Type', /json/)
        // .then((data: any) => data.json())
        .then((data: any) => { 
            // console.log('data', data)
            let content = data._body;
            // console.log('content', content)
            // expect data to be an array
            expect(Array.isArray(content)).toBe(true)
            for(const apiObj of content){
                expect(typeof apiObj).toBe('object'); 
                expect(typeof apiObj.apiVersion).toBe('string');
                expect(typeof apiObj.kind).toBe('string');
                expect(typeof apiObj.name).toBe('string');
                expect(typeof apiObj.namespace).toBe('string');
                expect(typeof apiObj.image).toBe('string');
                expect(typeof apiObj.location).toBe('string');
                expect(typeof apiObj.newVersion).toMatch(/string|boolean/);
                expect(typeof apiObj.description).toMatch(/string|boolean/);
                expect(typeof apiObj.deprecationStatus).toBe('string');
        }});
    });
});

describe("catch all route", () => {
    test("Should receive 404 when requesting non existing endpoints", () => {
        return request(server)
        .get('/pig')
        .expect(404)
        .expect('Page Not Found')

});
});
server.close(() => {
    console.log('HTTP server closed')
    })
//things we need to test
// server sends static files
// catch all route handler works
// error handler works

// let server: any;
// beforeAll((done)=>{
//     server = app.listen(3001,() => {
//         console.log('Test server listening on 3001')
//         done()
//     })        
// })

// // terminate the server
// afterAll((done) => {
// // Close the server after running the tests
//   server.close(() => {
//         console.log('Server closed');
//         done();
//     });
// });
    // for later, we can maybe have the tests start the server and then close the server down so the user doesnt have to do it manually