export default class TensorUtils {

  static getLength(shape) {
    let mul = 1;
    for (let dim of shape) {
      mul *= dim;
    }
    return mul;
  }

  static getStrides(shape) {
    let dimensions = shape.length;
    let strides = [];
    for (let i = 0; i < dimensions; i++) {
      strides.push(0);
    }

    let val = 1;
    for (let i = dimensions - 1; i >= 0; --i) {
      strides[i] = val;
      val *= shape[i];
    }

    return strides
  }

  static tensorToString(tensor) {
    let result = '';
    for (let i = 0; i < tensor.rank; i++) {
      result += '[';

      result += ']';
    }
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

  static boardcastTensor(tensor, shape) {

    if (TensorUtils.shapeEquals(tensor.shape, shape)) {
      return tensor;
    }

    // if we're on scalar, we can just create new array
    // if (this.isScalar())
    //   return Nd4j.createUninitialized(shape).assign(this.getDouble(0));


  }

  static shapeIsCompatible(a, b) {
    // let compatible = true;
    // int count = shape.length - 1;
    // int thisCount = Shape.rank(javaShapeInformation) - 1;
    // for (int i = shape.length - 1; i > 0; i--) {
    //   if (count < 0 || thisCount < 0)
    //     break;
    //   if (shape[count] != shape()[thisCount] && shape[count] != 1 && shape()[thisCount] != 1) {
    //     compatible = false;
    //     break;
    //   }
    //
    //   count--;
    //   thisCount--;
    // }
  }

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
}
