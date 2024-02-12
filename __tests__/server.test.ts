const request = require('supertest');

describe('dependencies', () => {
    let server: any;
    beforeAll((done) => {
        server = require('../server/server.ts');
        done();
    });

    test("a get request to /dependencies should return an array of dependency object", ()=>{
        // make a fetch request to /dependencies
        return request(server)
        .get('/dependencies')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((data: any) => { 
            let content = data._body;
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

    test("Should receive 404 when requesting non existing endpoints", () => {
        return request(server)
        .get('/pig')
        .expect(404)
        .expect('Page Not Found')
    });

    afterAll((done) => {
        server.close(() => {
            console.log('HTTP server closed');
            done(); // This ensures Jest waits for the server to close before exiting the test suite
        });
    });
});
