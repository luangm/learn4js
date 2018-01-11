import Tensor from "../core/Tensor";
import pako from "pako";
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

  init() {
    let self = this;
    fetch(this.options.testImageUrl)
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(buffer) {
        self._processImages(buffer);
      });
  }

  _processImages(buffer) {
    let array = new Uint8Array(buffer);
    let out = pako.inflate(array);
    // let view = new DataView(out.buffer);
    this._testImageData = new Uint8Array(out.buffer, 16);
    this._testArray = ArrayUtils.range(10000);
    this.testOffset = 0;
  }


}