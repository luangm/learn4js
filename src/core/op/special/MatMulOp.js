import SpecialOp from "./SpecialOp";
import * as Blas from "../../blas/Blas";

export default class MatMulOp extends SpecialOp {

  constructor(input, other, result, transposeA = false, transposeB = false) {
    super(input, other, result);
    this._transposeA = transposeA;
    this._transposeB = transposeB;
  }

  get type() {
    return 'matmul';
  }

  exec() {
    let transA = this._transposeA;
    let transB = this._transposeB;
    let m = this._transposeA ? this.input.shape[1] : this.input.shape[0];
    let n = this._transposeB ? this.other.shape[0] : this.other.shape[1];
    let k = this._transposeA ? this.input.shape[0] : this.input.shape[1];
    let alpha = 1;
    let beta = 0;
    let A = this.input.data;
    let B = this.other.data;
    let C = this.result.data;
    Blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  }
}