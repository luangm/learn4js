import {Tensor} from '../../src/index.js';
import TensorUtils from "../../src/core/util/TensorUtils";
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('conv2d', function() {
  let image = Tensor.linspace(1, 54, 54).reshape([2, 3, 3, 3]);
  println(image);

  let kernel = Tensor.linspace(1, 24, 24).reshape([2, 3, 2, 2]);
  println(kernel);

  let xCol = TensorUtils.im2col(image, kernel);
  println(xCol);

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

  let kCol = kernel.reshape([numKernels, kernelChannels * kernelWidth * kernelHeight]);
  println(kCol);

  let result = TensorMath.matmul(kCol, xCol);
  println(result);
  let reshaped = result.reshape([numKernels, numImages, outputHeight, outputWidth]);
  println(reshaped);
  let transpose = reshaped.transpose([1, 0, 2, 3]);
  println(transpose);
});
