import Learn4js from '../src/index.js';
import Session from "../src/session/Session";

console.log(Learn4js);

function test() {



  // let now = new Date().getTime();
  //
  // let W1 = Learn4js.constant({name: 'W1', data: [.1, .2, .3, .4, .5, .6], shape: [2, 3]});
  // let b1 = Learn4js.constant({name: 'b1', data: [.6, .5], shape: [2, 1]});
  // let x = Learn4js.constant({name: 'x', data: [0.2, 0.3, 0.3, 0.4, 0.1, 0.1], shape: [3, 2]});
  // let y = Learn4js.constant({name: 'Y', data: [.3, .4, .4, .5], shape: [2, 2]});
  // let learnRate = Learn4js.constant({name: 'learn_rate', data: [0.1], shape: [1, 1]});
  //
  // let matmul = Learn4js.matmul({name: 'matmul', left: W1, right: x});
  // let add = Learn4js.add({name: 'add', left: matmul, right: b1});
  // let sigmoid = Learn4js.sigmoid({name: 'sigmoid', base: add});
  // let sub = Learn4js.subtract({name: 'sub', left: y, right: sigmoid});
  // let square = Learn4js.square({name: 'square', base: sub});
  // let loss = Learn4js.reduceSum({name: 'loss', base: square});
  //
  //
  // let grads = Learn4js.gradients(loss, [W1, b1]);
  // let gradW1 = grads[0];
  // let gradb1 = grads[1];
  //
  // let mul1 = Learn4js.multiply({name: 'mul1', left: learnRate, right: gradW1});
  // let mul2 = Learn4js.multiply({name: 'mul2', left: learnRate, right: gradb1});
  //
  // let sub1 = Learn4js.subtract({name: 'sub1', left: W1, right: mul1});
  // let sub2 = Learn4js.subtract({name: 'sub2', left: b1, right: mul2});
  //
  // let assign1 = Learn4js.assign({name: 'assign1', target: W1, value: sub1});
  // let assign2 = Learn4js.assign({name: 'assign1', target: b1, value: sub2});
  //
  // // console.log(grads);
  // // let gradW1 = grads[0];
  // // console.log(gradW1.left);
  // // console.log(gradW1.right);
  //
  // let sess = new Session(Learn4js.activeGraph);
  //
  // // for (let i = 0; i < 1; i++) {
  // //   // console.log("loss", sess.run(loss).data);
  // //   sess.run(assign1);
  // //   sess.run(assign2);
  // // }
  //
  // console.log("loss", sess.run(loss));
  //
  // console.log("W1", sess.run(W1));
  // console.log("b1", sess.run(b1));
  //
  // let finish = new Date().getTime();
  //
  // console.log("Diff:", finish - now);
  // // console.log("matmul", sess.run(matmul));
  // // console.log("add", sess.run(add));
  // // console.log("sigmoid", sess.run(sigmoid));
  // // console.log("sub", sess.run(sub));
  // // console.log("square", sess.run(square));
  // // console.log("loss", sess.run(loss));
}

test();