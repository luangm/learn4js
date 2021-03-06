import pako from "pako";
import Tensor from "../core/Tensor";
import ArrayUtils from "../core/util/ArrayUtils";

export default class Mnist {

  constructor({trainImageUrl, trainLabelUrl, testImageUrl, testLabelUrl}) {
    this._options = {trainImageUrl, trainLabelUrl, testImageUrl, testLabelUrl};
    this._testImageData = null;
    this._testArray = [];
    this._testOffset = 0;
  }

  get options() {
    return this._options;
  }

  set testOffset(value) {
    this._testOffset = value;
  }

  /**
   * Returns a two Tensors: input and label
   */
  getNextTrainBatch(batchSize) {
    let input = new Tensor({shape: [batchSize, 1, 28, 28]});
    let imageSize = 28 * 28;
    for (let i = 0; i < batchSize; i++) {
      let index = this._testArray[this._testOffset++];  // The index of image
      let source = this._testImageData.subarray(index * imageSize, index * imageSize + imageSize);
      input.data.set(source, i * imageSize);
    }

    return {
      input,
      label: new Tensor({shape: [batchSize, 1]})
    }
  }

  async init() {
    let self = this;
    console.log("init");
    let response = await fetch(this.options.testImageUrl);
    console.log(response);
    let buffer = await response.arrayBuffer();
    self._processImages(buffer);
  }

  _processImages(buffer) {
    let array = new Uint8Array(buffer);
    let out = pako.inflate(array);
    // let view = new DataView(out.buffer);
    let rawData = new Uint8Array(out.buffer, 16);
    this._testImageData = new Float32Array(rawData.length);
    for (let i = 0; i < this._testImageData.length; i++) {
      if (rawData[i] > 0) {
        this._testImageData[i] = rawData[i] / 255;
      }
    }
    this._testArray = ArrayUtils.range(10000);
    this.testOffset = 0;
  }


}