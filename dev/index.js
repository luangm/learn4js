import Learn4js from '../src/index.js';

var pako = require('pako');

console.log(Learn4js);

function test() {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onload = function(oEvent) {
    var arrayBuffer = httpRequest.response; // Note: not oReq.responseText
    // let bodyArray = new Uint8Array(arrayBuffer, 8);

    let array = new Uint8Array(arrayBuffer);
    console.log("in", array);

    let out = pako.inflate(array);
    console.log("out", out);
    let view = new DataView(out.buffer);

    console.log(view.getInt32(0));
    console.log(view.getInt32(4));
    console.log(arrayBuffer);
    console.log(out);
    // console.log(bodyArray);

    // if (arrayBuffer) {
    //   var byteArray = new Uint8Array(arrayBuffer);
    //   for (var i = 0; i < byteArray.byteLength; i++) {
    //     // do something with each byte in the array
    //   }
    // }
  };

  // httpRequest.onreadystatechange = function() {
  //   // Process the server response here.
  //   // console.log(httpRequest.responseText);
  //   let text = httpRequest.responseText;
  //
  //   for (var i = 0; i < text.length; i++) {
  //     console.log(text.charCodeAt(i));
  //   }
  // };
  httpRequest.open('GET', './t10k-labels-idx1-ubyte.gz', true);
  httpRequest.responseType = "arraybuffer";
  httpRequest.send();
  // fetch('http://yann.lecun.com/exdb/mnist/train-labels-idx1-ubyte.gz', {
  //   mode: 'no-cors'
  // }).then(function(response) {
  //   console.log(response);
  // });
}

test();