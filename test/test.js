var should = require("should")
var bbb = require("../lib/babelsberg")

describe('bbb', function() {
  describe('properties', function() {
    it('contain empty solvers.', function() {
      bbb.should.have.property('defaultSolvers').with.lengthOf(0);
    });
    it('contain empty callbacks.', function() {
      bbb.should.have.property('callbacks').with.lengthOf(0);
    });
  });
  describe('#always()', function() {
    it('is Function Object.', function() {
      bbb.should.have.property('always').which.is.a.Function;
    });
    it('was declared in Babelsberg blass.', function() {
      bbb.always.should.property('declaredClass')
          .which.is.exactly("Babelsberg");
    });
  });
});
