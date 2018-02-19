function shiftRight(v, amt) {
  v = Math.floor(v) + 0.5;
  return Math.floor(v / Math.pow(2, amt));
}

function shiftLeft(v, amt) {
  return Math.floor(v * Math.pow(2, amt) + 0.5);
}

function maskLast(v, bits) {
  return v % shiftLeft(1.0, bits);
}

function extractBits(num, from, to) {
  from = Math.floor(from + 0.5);
  to = Math.floor(to + 0.5);
  return maskLast(shiftRight(num, from), to - from);
}

function encode_float1(val) {
  if (val === 0.0) {
    return [0, 0, 0, 0];
  }

  let sign = val > 0.0 ? 0.0 : 1.0; // float
  val = Math.abs(val); // float
  let exponent = Math.floor(Math.log2(val)); // int
  console.log("Exponent: ", exponent);

  let biased_exponent = exponent + 127.0; // int
  let fraction = ((val / Math.pow(2, exponent)) - 1.0) * 8388608.0;

  console.log("Fraction:", fraction);

  let t = biased_exponent / 2.0;
  let last_bit_of_biased_exponent = (t - Math.floor(t)) * 2.0;
  let remaining_bits_of_biased_exponent = Math.floor(t);

  let byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;
  let byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;
  let byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;
  let byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;

  return [byte4, byte3, byte2, byte1];
}

function encode_float2(val) {
  let a = Math.abs(val);                           // encode absolute value + sign
  let exp = Math.floor(Math.log2(a));                 // number of powers of 2
  let mant = Math.pow(2., Math.log2(a) - exp) * 8388608;  // multiply to fill 24 bits (implied leading 1)
  let mant1 = Math.floor(mant / 256 / 256);    // first 8 bits of mantissa
  let mant2 = Math.floor(mant / 256) % 256; // second 8 bits
  let mant3 = mant % 256;               // third 8 bits

  let sign = 128. - 128. * (a / val);			// sign bit is 256 or 0
  let e = (sign + exp + 127.) / 510.;		// exponent and sign
  let m1 = (mant1 - (128. * (1. - (exp + 127) % 2))) / 255.; // handle leading bit
  let m2 = (mant2) / 255.;				// middle part
  let m3 = (mant3 + .5) / 255.;			// scale to 0 - 255

  return [m3, m2, m1, e];
}

test('encode_float 1', function() {

  let x = -123.3212345;
  let a = encode_float1(x);
  let b = encode_float2(x);

  a[0] *= 255;
  a[1] *= 255;
  a[2] *= 255;
  a[3] *= 255;
  b[0] *= 255;
  b[1] *= 255;
  b[2] *= 255;
  b[3] *= 255;

  console.log(a);
  console.log(b);

  let aArray = new Uint8Array(a);
  let bArray = new Uint8Array(b);

  console.log(aArray);
  console.log(bArray);

  let aFloatArray = new Float32Array(aArray.buffer);
  let bFloatArray = new Float32Array(bArray.buffer);

  console.log(aFloatArray);
  console.log(bFloatArray);

  let floatx = new Float32Array([x]);
  console.log(floatx);
  let uintAray = new Uint8Array(floatx.buffer);
  console.log(uintAray);
});