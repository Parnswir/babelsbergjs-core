var should = require("should")
var bbb = require("../lib/babelsberg")
var bbb_cassowary = require("babelsbergjs-cassowary")


function prepared_always(ctx,callback) {
  ctx = ctx || {};
  return bbb.always({
    solver: new bbb_cassowary.ClSimplexSolver(),
    ctx: ctx
  }, callback);
}


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


  it('can disable constraints temporarily.', function() {
    var obj = {a: 8};
    var c = prepared_always({obj: obj}, function () {
        return obj.a >= 100;
    });
    obj.a = 110;
    (function(){
      obj.a = 90
    }).should.throw(/^\(ExCLRequiredFailure\).*/);
    c.disable();
    obj.a = 90;
    obj.a.should.be.exactly(90);
    c.enable();
    obj.a.should.be.exactly(100);
    (function(){
        obj.a = 90;
    }).should.throw(/^\(ExCLRequiredFailure\).*/);
  });
});
