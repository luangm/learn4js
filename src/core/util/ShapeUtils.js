export default class ShapeUtils {

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

  static inferOrder(shape, strides) {
    let isFortran = true; // Fortran Contiguous
    let isC = true; // C Contiguous

    let stride = 1;
    for (let i = shape.length - 1; i >= 0; i--) {
      if (stride !== strides[i]) {
        isC = false;
        break;
      }
      stride *= shape[i];
    }

    stride = 1;
    for (let i = 0; i < shape.length; i++) {
      if (stride !== strides[i]) {
        isFortran = false;
        break;
      }
      stride *= shape[i];
    }

    if (isFortran && !isC) {
      return 'f';
    }
    return 'c';
  }
}