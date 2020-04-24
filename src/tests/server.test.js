const request = require('supertest');
const express = require('express');
 
const app = express();
 
app.get('/all', function(req, res) {
  res.status(200).json({test: 'test'});
});
 
request(app)
  .get('/all')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

  describe('GET /all', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });