## WebGL Implementation of TensorMath

### WebGL Tensor
A WebGL Tensor contains a WebGL Texture.
The Texture is created with float-extension.
If float is not supported then need to do encoding //  TODO

### WebGL Algorithm Workflow
1. A WebGLContext is created
2. Create One or more WebGLTensors
3. Create an instance of WebGLProgram (such as AXPY or GEMM)
4. Pass WebGLTensor as input/output to the WebGLProgram
5. Execute the WebGLProgram through program.exec()

... Repeat for multiple programs

If the result need to be read back to CPU, call tensor.transfer();

