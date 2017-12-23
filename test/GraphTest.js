import Learn4js from '../src/index.js';
import Session from "../src/session/Session";

describe('Graph', function() {

  it('create graph with add', function() {
    let a = Learn4js.constant({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let b = Learn4js.constant({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let add = Learn4js.add({left: a, right: b});

    let sess = new Session(Learn4js.activeGraph);
    let result = sess.run(add);
    console.log(result); // should be a tensor
    console.log(Learn4js.activeGraph);
  });

});