import {parse} from 'acorn';
import {generate} from 'esotope';

function _id(name) {
  return {type: 'Identifier', name};
}

function _prop(name) {
  return {
    type: 'Property',
    kind: 'init',
    key: _id(name),
    value: _id(name)
  }
}

function _return(array) {
  let props = array.map((item) => {
    return _prop(item.name);
  });

  return {
    type: 'ReturnStatement',
    argument: {
      type: 'ObjectExpression',
      properties: props
    }
  }
}

function _call(clazz, method, args) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: _id(clazz),
      property: _id(method)
    },
    arguments: args || []
  }
}

function _declarator(name, init) {
  return {
    type: 'VariableDeclarator',
    id: _id(name),
    init: init
  };
}

export default class AstCompiler {

  constructor() {
    this._declarations = [];
  }

  compile(func) {
    this._declarations = [];
    let ast = parse('var fn =' + func);
    var args = ast.body[0].declarations[0].init.params.reduce(function(init, val) {
      init.push(val.name);
      return init;
    }, []);

    //Fetch function body
    var body = ast.body[0].declarations[0].init.body;

    //Build the desired program
    var program = {
      type: 'Program',
      body: body.body
    };

    program.body.forEach((exp, index) => {
      this.visit(exp, index, program);
    });

    program.body.push(_return(this._declarations));

    //Build new function args
    args.push(generate(program));

    var retFn = Function.apply(func, args);
    console.log(retFn.toString());

    return retFn;
  }


  visit(exp, index, program) {
    console.log("VISIT: ", exp);
    switch (exp.type) {

      case 'ReturnStatement':
        console.log("<<<", exp.argument, exp.argument.properties);

        break;

      case 'VariableDeclaration':
        let declaration = exp.declarations[0];
        console.log(">>>>", declaration);
        this._declarations.push(declaration.id);
        let init = declaration.init;

        switch(init.type) {
          case 'ArrayExpression':
          case 'Literal':
            exp.declarations[0] = _declarator(declaration.id.name, _call('Tensor', 'create', [init]));
            break;
          case 'BinaryExpression':
            break;
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
}