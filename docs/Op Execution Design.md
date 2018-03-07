### Optimization of Execution of Ops

The execution speed of Ops using CPU greatly depends on the execution order of loops (due to L1 and L2 cache).
Due to simple math ops, the majority of time is spent on data access operations.

The following optimization is done for execution of ops:

#### Cases for 2D Matrices
Because 2D cases are more common than non-2D cases, a special execution path is done for 2D only.

1. cache the individual stride * broadcast, to remove individual array access cost in inner loops
2. use pointer arithmetic
3. [optional] loop unrolling

#### General cases
for 3d and higher, a general loop is used. The performance of general loop suffers from many array indexer accesses.
