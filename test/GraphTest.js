import Learn4js from '../src/index.js';
import Session from "../src/session/Session";

describe('Graph', function() {

  it('graph', function() {
    let W1 = Learn4js.constant({name: 'W1', data: [.1, .2, .3, .4, .5, .6], shape: [2, 3]});
    let b1 = Learn4js.constant({name: 'b1', data: [.6, .5], shape: [2, 1]});
    let x = Learn4js.constant({name: 'x', data: [0.2, 0.3, 0.3, 0.4, 0.1, 0.1], shape: [3, 2]});
    let y = Learn4js.constant({name: 'Y', data: [.3, .4, .4, .5], shape: [2, 2]});

    let matmul = Learn4js.matmul({name: 'matmul', left: W1, right: x});
    let add = Learn4js.add({name: 'add', left: matmul, right: b1});
    let sigmoid = Learn4js.sigmoid({name: 'sigmoid', base: add});
    let sub = Learn4js.subtract({name: 'sub', left: y, right: sigmoid});
    let square = Learn4js.square({name: 'square', base: sub});
    let loss = Learn4js.reduceSum({name: 'loss', base: square});


    let sess = new Session(Learn4js.activeGraph);

    // console.log("W1", sess.run(W1));
    // console.log("b1", sess.run(b1));
    // console.log("matmul", sess.run(matmul));
    // console.log("add", sess.run(add));
    // console.log("sigmoid", sess.run(sigmoid));
    // console.log("sub", sess.run(sub));
    // console.log("square", sess.run(square));
    // console.log("loss", sess.run(loss));

  });

});