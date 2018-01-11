export default class ArrayUtils {
  static range(stop, start = 0, step = 1) {
    let count = (stop - start ) / step;
    if (count !== Math.floor(count)) {
      throw new Error('Invalid Argument');
    }

    let result = [];
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  }

  static shuffle(array) {
    let j = 0;
    let temp = 0;
    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}