## Explain the concept of "hoisting" in JavaScript

In JavaScript, hoisting refers to the built-in behavior of the language through which declarations of functions, variables, and classes are moved to the top of their scope – all before code execution. In turn, this allows us to use functions, variables, and classes before they are declared.

### Summary
Variable declarations (var): 
- Declarations are hoisted, but not initializations. The value of the variable is undefined if accessed before initialization.

Variable declarations (let and const): 
- Declarations are hoisted, but not initialized. Accessing them results in ReferenceError until the actual declaration is encountered.

Function expressions (var): 
- Declarations are hoisted, but not initializations. The value of the variable is undefined if accessed before initialization.

Function declarations (let and const): 
- Declarations are hoisted, but not initialized. Accessing them results in ReferenceError until the actual declaration is encountered.

Function declarations (function): 
- Both declaration and definition are fully hoisted.

Class declarations (class): 
- Declarations are hoisted, but not initialized. Accessing them results in ReferenceError until the actual declaration is encountered.

Import declarations (import): 
- Declarations are hoisted, and side effects of importing the module are executed before the rest of the code.

## How it works:
Hoisting:
- The variable declaration (not the assignment) is hoisted to the top of its scope (either global or block scope).

Temporal Dead Zone (TDZ):
- The period between the start of the scope and the declaration of the variable is known as the Temporal Dead Zone. Attempting to access the variable within the TDZ results in a ReferenceError.


## Under the hood
In reality, JavaScript creates all variables in the current scope before it even tries to executes the code. Variables created using var keyword will have the value of undefined where variables created using let and const keywords will be marked as <value unavailable>. Thus, accessing them will cause a ReferenceError preventing you to access them before initialization.

In ECMAScript specifications let and const declarations are explained as below:

- The variables are created when their containing Environment Record is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated.

However, this statement is a litle bit different for the var keyword:

- Var variables are created when their containing Environment Record is instantiated and are initialized to undefined when created.

## Modern practices
In practice, modern code bases avoid using var and use let and const exclusively. It is recommended to declare and initialize your variables and import statements at the top of the containing scope/module to eliminate the mental overhead of tracking when a variable can be used.
