const timestampMiddleware = require('../lib/middleware/timestamp.js');

// Tested middleware needs to either be exported from the server or a separate module
describe('timestamp middleware', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    // Attach to the console (take it over)
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Put the console back
    consoleSpy.mockRestore();
  });

  it('adds a timestamp to the req object', () => {
    timestampMiddleware(req, res, next);
    console.log('Time Check?', req.timestamp);
    expect(req).toHaveProperty('timestamp');
  });

  it('properly moves to the next middleware', () => {
    timestampMiddleware(req, res, next);
    // toHaveBeenCalled() is not enough, we need to make sure it was called with no args
    expect(next).toHaveBeenCalledWith();
  });

});
