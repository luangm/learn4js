import {println, Tensor} from "../../src/index";
import {parse} from 'acorn';
import {generate} from 'esotope';
import Learn4js from "../../src/Learn4js";

test('learn4js.graph', function() {

  let graph = Learn4js.graph(function(Learn4js, Tensor, println) {
    let a = [[1, 2, 3], [4, 5, 6]];
    let b = [[2, 3, 4], [5, 6, 7]];
    let c = a + b;
  });

  println(graph.c);

  let sess = Learn4js.session();

});

test('esprima', function() {

  function visit(exp, index, program) {
    console.log("VISIT: ", exp);
    switch (exp.type) {
      case 'VariableDeclaration':
        let declaration = exp.declarations[0];
        console.log(">>>>", declaration);

        // console.log(declaration.init);
        let init = declaration.init;
        if (init.type === 'ArrayExpression' || init.type === 'Literal') {
          let newD = {
            type: 'VariableDeclarator',
            id: {type: 'Identifier', name: declaration.id.name},
            init: {
              type: 'CallExpression',
              callee: {type: 'Identifier', name: 'toTensor'},
              arguments: [init]
            }
          };
          exp.declarations[0] = newD;
        }

        if (init.type === 'BinaryExpression') {
          if (init.operator === '+') {
            let left = init.left;
            let right = init.right;

            let newCallExp = {
              type: 'CallExpression',
              arguments: [right],
              callee: {
                type: 'MemberExpression',
                object: left,
                property: {type: "Identifier", name: 'add'}
              }
            };

            declaration.init = newCallExp;
          }

          if (init.operator === '-') {
            let left = init.left;
            let right = init.right;

            let newCallExp = {
              type: 'CallExpression',
              arguments: [right],
              callee: {
                type: 'MemberExpression',
                object: left,
                property: {type: "Identifier", name: 'subtract'}
              }
            };

            declaration.init = newCallExp;
          }
        }
        // let value = expToValue(init);
        // if (value != null) {
        //   console.log("value: ", value.toString());
        //   declaration.init = esprima.parse('toTensor(' + value + ')');
        // }
        break;
    }
  }

  function expToValue(exp) {
    if (exp.type === 'Literal') {
      return exp.value;
    }

    if (exp.type === 'ArrayExpression') {
      let array = [];
      for (let item of exp.elements) {
        array.push(expToValue(item));
      }
      return array;
    }

    return null;
  }

  function fun() {
    let a = [1, 2, 3];
    let b = [4, 5, 6];
    let c = a - b;
    println(c);
  }

  function toTensor(val) {
    return Tensor.create(val);
  }

  let ast = parse('' + fun);
  let funcStatement = ast.body[0].body;
  let program = {
    type: 'Program',
    sourceType: 'script',
    body: funcStatement.body
  };

  program.body.forEach(function(exp, index) {
    visit(exp, index, program);
  });

  console.log(program);

  var newCode = generate(program);
  // console.log(newCode);

  let args = [];
  args.push(newCode);

  let res = Function(args);
  console.log(res.toString());
  eval(newCode);


});