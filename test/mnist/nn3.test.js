import Learn4js, {println, Tensor, Logger} from '../../src/index';

test('Neural Net', function() {

  Logger.LogLevel = Logger.Level.DEBUG;

  Learn4js.interactive = true;

  let labels = Learn4js.variable([2, 4], {name: 'labels'});
  let W = Learn4js.parameter(Tensor.rand([4, 4]), {name: 'W'});
  let x = Learn4js.variable([2, 4], {name: 'x'});
  let b = Learn4js.parameter(Tensor.rand([2, 1]), {name: 'b'});

  // let a = Learn4js.constant([[4.38, 0.56, 0.669, 12.276], [24.466, 2.518, 1.779, 15.702]]);

  // let softmax = Learn4js.softmax(a);
  // println(softmax);

  let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.1});

  let id = 0;

  for (let i = 0; i < 1000; i++) {
    x.value = Tensor.create([[1, 2, 3, 4], [5, 6, 7, 8]]);
    labels.value = Tensor.create([[0, 0, 0, 1], [1, 0, 0, 0]]);

    let mm = Learn4js.matmul(x, W);
    let logits = Learn4js.add(mm, b);

    let loss = Learn4js.loss.softmaxCrossEntropy(labels, logits);
    id = loss.id;

    let trainStep = optimizer.minimize(loss);
    trainStep.eval();
  }

  let out = Learn4js.getNode(id);
  println(out);

  println(W);
  println(b);

});