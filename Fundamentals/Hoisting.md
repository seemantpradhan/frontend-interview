## Explain the concept of "hoisting" in JavaScript

In JavaScript, hoisting refers to the built-in behavior of the language through which declarations of functions, variables, and classes are moved to the top of their scope – all before code execution. In turn, this allows us to use functions, variables, and classes before they are declared.

### Variable declarations (var): 
- Declarations are hoisted, but not initializations. The value of the variable is undefined if accessed before initialization.

### Variable declarations (let and const): 
- Declarations are hoisted, but not initialized. Accessing them results in ReferenceError until the actual declaration is encountered.

### Function expressions (var): 
- Declarations are hoisted, but not initializations. The value of the variable is undefined if accessed before initialization.

### Function declarations (function): 
- Both declaration and definition are fully hoisted.

### Class declarations (class): 
- Declarations are hoisted, but not initialized. Accessing them results in ReferenceError until the actual declaration is encountered.

### Import declarations (import): 
- Declarations are hoisted, and side effects of importing the module are executed before the rest of the code.
