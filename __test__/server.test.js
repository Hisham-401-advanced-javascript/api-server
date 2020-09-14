'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 500 on an error', () => {

    return mockRequest
      .get('/bad')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);

  });

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);

  });

  it('should respond properly on GET request to /categories', () => {

    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on POST request to /categories', () => {

    return mockRequest
      .post('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on PUT request to /categories', () => {

    return mockRequest
      .put('/categories/:id')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on DELETE request to /categories', () => {

    return mockRequest
      .delete('/categories/:id')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on GET request to /products', () => {

    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on POST request to /products', () => {

    return mockRequest
      .post('/products')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on PUT request to /products', () => {

    return mockRequest
      .put('/products/:id')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

  it('should respond properly on DELETE request to /products', () => {

    return mockRequest
      .delete('/products/:id')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });


});
