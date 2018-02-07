export default class TensorFormatter {

  constructor({separator = ', ', padding = 0, decimalFormat, precision = 4} = {}) {
    this._separator = separator;
    this._padding = padding;
    this._decimalFormat = decimalFormat;
    this._precision = 3;
  }

  get separator() {
    return this._separator;
  }

  set separator(value) {
    this._separator = value;
  }

  format(tensor) {
    return this._format(tensor, tensor.rank);
  }

  _format(tensor, rank, offset = 0) {
    if (tensor.isScalar) {
      return this._formatNumber(tensor.get([]));
    }

    if (tensor.isVector) {
      let result = '[';
      for (let i = 0; i < tensor.length; i++) {
        result += this._formatNumber(tensor.get([i]));
        if (i < tensor.length - 1) {
          result += '  ';
        }
      }
      result += ']';
      return result;
    }

    offset++;
    let result = '[';
    for (let i = 0; i < tensor.slices; i++) {
      let slice = tensor.slice(i);
      result += this._format(slice, rank - 1, offset);
      if (i !== tensor.slices - 1) {
        result += '  \n';
        result += '\n'.repeat(rank - 2);
        result += ' '.repeat(offset);
      }
    }
    result += ']';
    return result;
  }

  _formatNumber(number) {
    let result = number.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 3
    });

    // let index = result.indexOf('.');
    // if (index < 0) {
    //   result += '    ';
    // }

    return result;
  }
}
