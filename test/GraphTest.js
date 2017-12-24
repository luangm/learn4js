import Learn4js from '../src/index.js';
import Session from "../src/session/Session";

describe('Graph', function() {

  it('graph', function() {
    let a = Learn4js.constant({data: [.1, .2, .3, .4, .5, .6], shape: [2, 3]});
    let b = Learn4js.constant({data: [.1, .2, .3, .4, .2, .3, .4, .5, .3, .4, .5, .6], shape: [3, 4]});
    let y = Learn4js.constant({data: [1, 0, 1, 0, 0, 1, 0, 1], shape: [2, 4]});

    let matmul = Learn4js.matmul({left: a, right: b});
    let sigmoid = Learn4js.sigmoid({base: matmul});
    let sub = Learn4js.subtract({left: y, right: sigmoid});
    let square = Learn4js.square({base: sub});
    let reduceSum = Learn4js.reduceSum({base: square});

    let sess = new Session(Learn4js.activeGraph);
    console.log("a", sess.run(a));
    console.log("b", sess.run(b));
    console.log("matmul", sess.run(matmul));
    console.log("sigmoid", sess.run(sigmoid));
    console.log("sub", sess.run(sub));
    console.log("square", sess.run(square));
    console.log("reduceSum", sess.run(reduceSum));

  });

});