var request = require('supertest')
  , app     = require('../app.js').app
  , assert  = require("assert");

describe('POST /', function(){
  it('should be good', function(done){
    request(app)
        .post('/products')
        .send({ })
        .end(function(err, res){
          if (err)
            done(err);
          done();
        })
  })
});


/*ar assert = require('assert');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var testUsers = require('../models/Users.js');

  describe('Connection', function() {
    mongoose.connect('mongodb://localhost/bibalou')
      .then(() =>  done())
      .catch((err) => done(err));

      tobi = new testUsers({email : 'tobi', password: "aert"}),
      loki = new testUsers({email : 'loki', password: "aert"}),
      jane = new testUsers({email : 'jane', password: "aert"});

    beforeEach(function(done) {
        testUsers.save([tobi, loki, jane], function(err){
          if (err)
            done(err);
            else {
              done();
            }
        });
    });


  describe('#find()', function() {
    it('respond with matching records', function(done) {
      testUser.find(function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});*/

/*describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});
describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
*/
