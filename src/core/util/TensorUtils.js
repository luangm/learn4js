import Tensor from "../Tensor";

export default class TensorUtils {

  static broadcastShapes(a, b) {
    let rank = a.length;
    let result = Array.from(a);

    if (b.length > a.length) {
      rank = b.length;
      result = Array.from(b);
    }

    let aIndex = a.length - 1;
    let bIndex = b.length - 1;

    for (let i = 0; i < rank; i++) {
      if (aIndex < 0 || bIndex < 0) {
        break;
      }

      let left = a[aIndex];
      let right = b[bIndex];

      if (left !== 1 && right !== 1 && left !== right) {
        throw new Error('cannot broadcast shapes. not compatible');
      }

      if (b.length > a.length) {
        result[bIndex] = Math.max(left, right);
      } else {
        result[aIndex] = Math.max(left, right);
      }

      aIndex--;
      bIndex--;
    }

    return result;
  }

  static broadcastTensor(tensor, shape) {

    if (TensorUtils.shapeEquals(tensor.shape, shape)) {
      return tensor;
    }

    // if we're on scalar, we can just create new array
    // if (this.isScalar())
    //   return Nd4j.createUninitialized(shape).assign(this.getDouble(0));

    let compatible = this.shapeIsCompatible(tensor.shape, shape);

    if (!compatible) {
      throw new Error('Incompatible broadcast from ' + tensor.shape + ' to ' + shape);
    }

    let retShape = TensorUtils.broadcastShapes(tensor.shape, shape);
    let result = new Tensor({shape: retShape});
    let idx = 0;
    for (let i = 0; i < result.length; i++) {
      result.data[i] = tensor.data[idx++];
      if (idx >= tensor.length) {
        idx = 0;
      }
    }

    return result;
  }

  static computeOffset(indices, shape, strides) {
    let offset = 0;

    for (let i = 0; i < shape.length; i++) {
      let size = shape[i];
      if (indices[i] >= size) {
        throw new Error('Index out of bound');
      }
      if (size !== 1) {
        offset += indices[i] * strides[i];
      }
    }
    return offset;
  }

  static getLength(shape) {
    let mul = 1;
    for (let dim of shape) {
      mul *= dim;
    }
    return mul;
  }

  static getStrides(shape) {
    let rank = shape.length;
    let strides = new Array(rank);

    let val = 1;
    for (let i = rank - 1; i >= 0; --i) {
      strides[i] = val;
      val *= shape[i];
    }

    return strides
  }

  static reshape(tensor, newShape) {
    if (TensorUtils.shapeEquals(tensor.shape, newShape)) {
      return tensor;
    }

    return new Tensor({data: tensor.data, shape: newShape});
  }

  static shapeEquals(a, b) {
    if (a == null || b == null) {
      return false;
    }
    if (a === b) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  static shapeIsCompatible(a, b) {
    let rank = Math.max(a.length, b.length);
    let aIndex = a.length - 1;
    let bIndex = b.length - 1;

    for (let i = 0; i < rank; i++) {
      if (aIndex < 0 || bIndex < 0) {
        break;
      }

      let left = a[aIndex--];
      let right = b[bIndex--];

      if (left !== 1 && right !== 1 && left !== right) {
        return false;
      }
    }

    return true;
  }

  static tensorToString(tensor) {
    let result = '';
    for (let i = 0; i < tensor.rank; i++) {
      result += '[';

      result += ']';
    }
  }
}
