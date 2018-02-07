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

  static col2im(col, image, kernel, {padWidth = 0, padHeight = 0, strideWidth = 1, strideHeight = 1} = {}) {

    let numImages = image.shape[0];
    let channels = image.shape[1];
    let height = image.shape[2]; // rows
    let width = image.shape[3]; // cols

    let numKernels = kernel.shape[0];
    let kernelChannels = kernel.shape[1];
    let kernelHeight = kernel.shape[2]; // rows
    let kernelWidth = kernel.shape[3]; // cols

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight, padHeight, strideHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth, padWidth, strideWidth);

    let result = new Tensor({shape: [numImages, channels, height, width]});
    let dataIndex = 0;

    for (let c = 0; c < kernelChannels; c++) {
      for (let kRow = 0; kRow < kernelHeight; kRow++) {
        for (let kCol = 0; kCol < kernelWidth; kCol++) {

          for (let n = 0; n < numImages; n++) {

            let inputRow = kRow - padHeight;
            for (let oR = 0; oR < outputHeight; oR++) {

              if (inputRow < 0 || inputRow >= height) {
                dataIndex += outputWidth;
                continue;
              }

              let inputCol = kCol - padWidth;
              for (let oC = 0; oC < outputWidth; oC++) {
                if (inputCol >= 0 && inputCol < width) {
                  result.data[n * channels * width * height + c * width * height + inputRow * width + inputCol] += col.data[dataIndex];
                }
                dataIndex++;
                inputCol += strideWidth;
              }

              inputRow += strideHeight;
            }
          }

        }
      }
    }

    return result;
  }

  static computeConv2dOutSize(imageSize, kernelSize, padSize = 0, stride = 1) {
    let result = (imageSize - kernelSize + 2 * padSize) / stride + 1;
    if (result !== Math.floor(result)) {
      throw new Error('Cannot do conv2d with these values: imageSize: {' + imageSize + '}, kernelSize: {' + kernelSize + '}');
    }
    return result;
  }

  static computeConv2dShape(image, kernel) {
    let numImages = image.shape[0];
    let channels = image.shape[1];
    let height = image.shape[2]; // rows
    let width = image.shape[3]; // cols

    let numKernels = kernel.shape[0];
    let kernelChannels = kernel.shape[1];
    let kernelHeight = kernel.shape[2]; // rows
    let kernelWidth = kernel.shape[3]; // cols

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth);

    return [numImages, numKernels, outputHeight, outputWidth];
  }

  static computeMaxPoolShape(imageShape, kernelShape, strideWidth, strideHeight) {
    let numImages = imageShape[0];
    let channels = imageShape[1];
    let height = imageShape[2]; // rows
    let width = imageShape[3]; // cols

    let numKernels = kernelShape[0];
    let kernelChannels = kernelShape[1];
    let kernelHeight = kernelShape[2]; // rows
    let kernelWidth = kernelShape[3]; // cols

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight, 0, strideHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth, 0, strideWidth);

    return [numImages, numKernels, outputHeight, outputWidth];
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

  /**
   * Get the indices that are reduced, return null if one of the indices is not reduced.
   */
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

    return {
      left: left >= 0 ? left : null,
      right: right >= 0 ? right : null
    }
  }

  // image is a tensor of [channels, rows, cols]
  static im2col(image, kernelShape, {padWidth = 0, padHeight = 0, strideWidth = 1, strideHeight = 1} = {}) {
    if (image.rank !== 4) {
      throw new Error('image\'s rank is not 4');
    }

    if (kernelShape.length !== 4) {
      throw new Error('kernel\'s rank is not 4');
    }

    let numImages = image.shape[0];
    let channels = image.shape[1];
    let height = image.shape[2]; // rows
    let width = image.shape[3]; // cols

    let numKernels = kernelShape[0];
    let kernelChannels = kernelShape[1];
    let kernelHeight = kernelShape[2]; // rows
    let kernelWidth = kernelShape[3]; // cols

    if (channels !== kernelChannels) {
      throw new Error('image channels (shape[1]) must equal kernel channels (shape[1])');
    }

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight, padHeight, strideHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth, padWidth, strideWidth);

    let resultHeight = kernelChannels * kernelHeight * kernelWidth;
    let resultWidth = numImages * outputHeight * outputWidth;

    let result = new Tensor({shape: [resultHeight, resultWidth]});

    let resultIndex = 0;

    for (let c = 0; c < kernelChannels; c++) {
      for (let kRow = 0; kRow < kernelHeight; kRow++) {
        for (let kCol = 0; kCol < kernelWidth; kCol++) {


          for (let n = 0; n < numImages; n++) {

            let inputRow = kRow - padHeight;
            for (let oR = 0; oR < outputHeight; oR++) {
              if (inputRow >= 0 && inputRow < height) {
                let inputCol = kCol - padWidth;
                for (let oC = 0; oC < outputWidth; oC++) {
                  if (inputCol >= 0 && inputCol < width) {
                    result.data[resultIndex++] = image.get([n, c, inputRow, inputCol]);//.data[inputRow * width + inputCol];
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
