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
    let broadcastDims = [];

    // pad front
    let front = retShape.length - tensor.shape.length;
    for (let i = 0; i < retShape.length; i++) {
      if (i < front || (tensor.shape[i - front] === 1 && retShape[i] !== 1)) {
        broadcastDims.push(1);
      } else {
        broadcastDims.push(0);
      }
    }

    let indices = new Array(retShape.length).fill(0);
    broadcastAtDim(0, indices);

    function broadcastAtDim(dim, targetIndices) {
      if (dim === targetIndices.length) {
        let sourceIndices = targetIndices.slice(front);
        for (let i = targetIndices.length - 1; i >= front; i--) {
          if (broadcastDims[i] === 1) {
            sourceIndices[i - front] = 0;
          }
        }
        let sourceOffset = TensorUtils.computeOffset(sourceIndices, tensor.shape, tensor.strides);
        let targetOffset = TensorUtils.computeOffset(targetIndices, result.shape, result.strides);
        // console.log(sourceOffset, tensor.data[sourceOffset], targetOffset);
        result.data[targetOffset] = tensor.data[sourceOffset];
        return;
      }

      for (let i = 0; i < retShape[dim]; i++) {
        targetIndices[dim] = i;
        broadcastAtDim(dim + 1, targetIndices);
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

  static getReductionIndices(a, b) {
    let resultShape = TensorUtils.broadcastShapes(a, b);
    let left = -1;
    let right = -1;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === 1 && a[i] !== resultShape[i]) {
        left = i;
      }

      if (b[i] === 1 && b[i] !== resultShape[i]) {
        right = i;
      }
    }

    return {left, right}
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

  // image is a tensor of [channels, rows, cols]
  static im2col(image, kernel, {padWidth = 0, padHeight = 0, strideWidth = 1, strideHeight = 1, dilationWidth = 1, dilationHeight = 1} = {}) {
    let channels = image.shape[0];
    let height = image.shape[1]; // rows
    let width = image.shape[2]; // cols
    let kernelHeight = kernel.shape[0]; // rows
    let kernelWidth = kernel.shape[1]; // cols

    let outputHeight = (height + 2 * padHeight - dilationHeight * (kernelHeight - 1) - 1) / strideHeight + 1;
    let outputWidth = (width + 2 * padHeight - dilationWidth * (kernelWidth - 1) - 1) / strideWidth + 1;
    let result = new Tensor({shape: [kernelHeight * kernelWidth, outputHeight * outputWidth]});

    let resultIndex = 0;

    for (let c = 0; c < channels; c++) {
      for (let kRow = 0; kRow < kernelHeight; kRow++) {
        for (let kCol = 0; kCol < kernelWidth; kCol++) {

          let inputRow = kRow * dilationHeight - padHeight;
          for (let oR = 0; oR < outputHeight; oR++) {
            if (inputRow >= 0 && inputRow < height) {
              let inputCol = kCol * dilationWidth - padWidth;
              for (let oC = 0; oC < outputWidth; oC++) {
                if (inputCol >= 0 && inputCol < width) {
                  result.data[resultIndex++] = image.data[inputRow * width + inputCol];
                } else {
                  result.data[resultIndex++] = 0;
                }
                inputCol += strideWidth;
              }
            } else {
              for (let oC = 0; oC < outputWidth; oC++) {
                result.data[resultIndex++] = 0;
              }
            }
            inputRow += strideHeight;
          }
        }
      }
    }

    return result;
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
