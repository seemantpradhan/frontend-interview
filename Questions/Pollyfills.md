Q. Write a program in JavaScript to create your own MyPromise that functions similarly to the built-in Promise using Polyfills.
Ans. Implement a custom MyPromise class that mimics JavaScript's built-in Promise functionality using polyfills.
Define a MyPromise class with a constructor that accepts an executor function.

Store the resolved value and state (pending, fulfilled, rejected) as properties.

Implement 'then' method to handle fulfilled and rejected states.

Use 'resolve' and 'reject' methods to change the state and trigger callbacks.

Handle chaining of promises by returning a new MyPromise instance from 'then'.

