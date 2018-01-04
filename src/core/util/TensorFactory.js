import Tensor from "../Tensor";
import Executor from "../executor/Executor";
import RandomOp from "../op/transform/RandomOp";
import Shape from "../Shape";
import LinspaceOp from "../op/transform/LinspaceOp";

export default class TensorFactory {
  /**
   * Create a tensor from the given array.
   * The length of the tensor is array.length * array[0].length * .... array[0]...[0].length
   * If any array's dimension does not match, an error is thrown.
   *
   * [1,2,3]: shape = [3], data = [1,2,3]
   * [[1,2,3],[4,5,6]]: shape = [2, 3], data = [1,2,3,4,5,6]
   * [[[1,2],[3,4],[5,6]], [[7,8],[9,10],[11,12]]], shape = [2, 3, 2], data = [1..12]
   */
  static create(array) {
    let shape = new Shape({shape: findShape(array)});
    let buffer = new Float32Array(shape.length);
    let indices = new Array(shape.rank);

    flatten(array, buffer, shape, indices, 0);
    return new Tensor({data: buffer, shape});

    function findShape(array, shape = [], dim = 0) {
      if (Array.isArray(array)) {
        if (array.length === 0) {
          throw new Error('array\'s length cannot be zero');
        }
        shape.push(array.length);
        findShape(array[0], shape, dim + 1);
      }
      return shape;
    }

    function flatten(array, buffer, shape, indices, dim) {
      if (dim === shape.rank) {
        let offset = shape.getOffset(indices);
        buffer[offset] = array;
        return;
      }

      if (array.length !== shape.getSize(dim)) {
        throw new Error('Dimension not match');
      }

      for (let i = 0; i < array.length; i++) {
        indices[dim] = i;
        flatten(array[i], buffer, shape, indices, dim + 1);
      }
    }
  }

  static linspace(from, to, num) {
    let tensor = new Tensor({shape: [num]});
    Executor.instance.exec(new LinspaceOp(tensor, null, tensor, {from, to, num}));
    return tensor;
  }

  static ones(shape) {
    return new Tensor({shape}).fill(1);
  }

  static rand(shape) {
    let tensor = new Tensor({shape});
    Executor.instance.exec(new RandomOp(tensor, null, tensor));
    return tensor;
  }

  static scalar(scalar) {
    return new Tensor({data: [scalar], shape: [1, 1]});
  }

  static zeros(shape) {
    return new Tensor({shape});
  }
}