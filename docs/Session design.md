Design of Session
-

Running an Learn4js model takes 2 things: a Graph and a Session

The Graph is a dynamically built but statically evaluated data structure, containing multiple nodes (Expression).
The Expressions does NOT store its value (Tensor) (with the exception of Constant, and Parameter).
But instead allow a Session to create a 1:1 mapping between the Expression and its value.

The Session object is in charge of storing/updating/deleting values of Expressions within a graph.
Each Session references a single graph only.


### Dependencies
* Session depends on: EvaluationVisitor
  * EvaluationVisitor depends on TensorMath
  
* Graph depends on ExpressionFactory
  * ExpressionFactory depends on all node types, with in turn depends on Expression

Due to circular reference, Expression should NOT depend on anything.

Therefore, the design should be:

* Graph contains a session reference
* Expression contains a Graph reference
* Expression calls this.graph.session for a session variable.

If another session is required, call graph.session = otherSession
