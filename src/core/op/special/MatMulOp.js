import SpecialOp from "./SpecialOp";
import Blas from "../../blas/Blas";

export default class MatMulOp extends SpecialOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'matmul';
  }

  exec() {
    let blas = new Blas();

    let transA = false;
    let transB = false;
    let m = this.input.shape[0];
    let n = this.other.shape[1];
    let k = this.input.shape[1];
    let alpha = 1;
    let beta = 0;
    let A = this.input.data;
    let B = this.other.data;
    let C = this.result.data;

    blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  }
}