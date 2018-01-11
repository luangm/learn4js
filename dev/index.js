import Learn4js, {println} from '../src/index';
import Mnist from '../src/mnist/Mnist';


function test() {
  console.log('test', Learn4js);
  let mnist = new Mnist({testImageUrl: './t10k-images-idx3-ubyte.gz'});
  mnist.init();

  window.setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      let result = mnist.getNextTrainBatch(2);
      println(result.input);
    }
  }, 1000)
  //
  // console.log(result);
}

test();