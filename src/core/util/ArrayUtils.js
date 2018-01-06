export default class ArrayUtils {
  static range(stop, start = 0, step = 1) {
    let count = (stop - start ) / step;
    if (count !== Math.floor(count)) {
      throw new Error('Invalid Argument');
    }

    let result = [];
    for (let i = start; i < stop; i+= step) {
      result.push(i);
    }
    return result;
  }
}