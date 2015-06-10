var bbb = require("babelsbergjs-core");
var bbb_cassowary = require("babelsbergjs-cassowary");

obj = {a: 1, b: 2};
s = new bbb_cassowary.ClSimplexSolver();
bbb.always({solver: s, ctx: {obj: obj}}, function () {
  return obj.a + 7 <= obj.b;
});
obj.a = 10;
console.log(obj.a, obj.b);
