var should = require("should")
var bbb = require("../lib/babelsberg")
var bbb_cassowary = require("babelsbergjs-cassowary")


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

    it('was declared in Babelsberg class.', function() {
      bbb.always.should.property('declaredClass')
          .which.is.exactly("Babelsberg");
    });
  });

  it('can use solver for simple reassignment solving.', function() {
    obj = {a: 1, b: 2};
    return bbb.always({
      solver: new bbb_cassowary.ClSimplexSolver(),
      ctx: {obj: obj}
    }, function () {
      return obj.a + 7 <= obj.b;
    });
    obj.a = 10;
    (obj.a + 7).should.not.be.greaterThan(obj.b);
  });
});
