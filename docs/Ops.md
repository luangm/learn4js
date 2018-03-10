# Learn4x Ops

| Name | TF  | Eval | Grad | Broadcast | Desc |
| ---  | --- | :---: | :---: | :---: | ---- |
| Arithmetic |
| Add  | tf.add | Y | Y | Y | z = x + y |
| Subtract | tf.subtract | Y | Y | Y | z = x - y |
| Multiply | tf.multiply | Y | Y | Y | z = x * y |
| Divide | tf.divide | Y | Y | Y | z = x / y |
| Modulo | tf.mod | Y | | Y | z = x % y |
|       | tf.pow | | | | z = x ^ y |
| Maximum | tf.maximum | Y | | | z = max(x, y) |
| Minimum | tf.minimum | Y | | | z = min(x, y) |
|       | tf.cross |
| Math Funcs |
| Absolute | tf.abs | Y | Y | | z = abs(x) |
| Negate | tf.negative | Y | Y | | z = -x |
| Sign | tf.sign | Y | | | z = x > 0 ? 1 : (x < 0 ? -1 : 0) |
| Step |   | Y | | | z = x > 0 ? 1 : 0 |
| Reciprocal | tf.reciprocal | Y | Y | | z = 1/x |
| Square | tf.square | Y | Y | | z = x^2 |
| Round | tf.round | Y | | | z = round(x) |
| SquareRoot | tf.sqrt | Y | Y | | z = sqrt(x) |
| RSqrt | tf.rsqrt | Y | | | z = 1 / sqrt(x) |
| Exponential | tf.exp | Y | Y | | z = exp(x) |
| Expm1 | tf.expm1 | Y | | | z = exp(x) - 1 |
| Logarithm | tf.log | Y | Y | | z = log(x) |
| Log1p | tf.log1p | Y | | | z = log1p(x) |
|  | tf.ceil |
|  | tf.floor |
| Cosine | tf.cos | Y | Y | | z = cos(x) |
| Sine | tf.sin | Y | Y | | z = sin(x) |
|    | tf.lbeta |
| Tangent | tf.tan | Y | | | z = tan(x) |
|    | tf.acos |
|    | tf.asin |
|    | tf.atan |
|    | tf.cosh |
|    | tf.sinh |
|    | tf.asinh |
|    | tf.acosh |
|    | tf.atanh |
|    | tf.lgamma |
|    | tf.digamma |
|    | tf.erf |
|    | tf.erfc |
|    | tf.squared_difference | 
|    | tf.igamma |
|    | tf.igammac |
|    | tf.zeta |
|    | tf.polygamma |
|    | tf.betainc |
|    | tf.rint |