# babelsbergjs-core

## An easy to use Node package for BabelsbergJS.

See [the original repo](https://github.com/babelsberg/babelsberg-js) for more info on Babelsberg.

## Usage

* require babelsbergjs-core and a [solver](https://github.com/babelsbergjs/babelsbergjs-cassowary) in your Node project:

```javascript
  var bbb = require('babelsbergjs-core');
  var bbb_cassowary = require("babelsbergjs-cassowary")
```
  
* use constraints

```javascript
  obj = {a: 1, b: 2};
  return bbb.always({
    solver: new bbb_cassowary.ClSimplexSolver(),
    ctx: {obj: obj}
  }, function () {
    return obj.a + 7 <= obj.b;
  });
  obj.a = 10; // obj.b is now >= 17
```
  
* check out solvers, tools and examples [here](https://github.com/babelsbergjs).
