//a promise object that gets resolved
const promObj = new Promise((resolve, reject) => resolve("I am here 1"));

//sync
console.log(promObj, "a resolved promise object"); //Promise { 'I am here 1' } a resolved promise object

promObj
  .then((str) => {
    console.log(str, "promise 1"); //I am here 1 promise 1
    return new Promise((resolve, reject) => resolve("I am here 2"));
  })
  .then((str2) => {
    console.log(str2, "promise 2"); //I am here 2 promise 2
  });

const promObjFunc = () => {
  // returns a promise object that resolves. i.e a promise object with the resolved value
  return new Promise((resolve, reject) =>
    resolve("I am the return value of a function")
  );
};
//sync
console.log(promObjFunc(), "prom Obj func"); //Promise { 'I am the return value of a function' } prom Obj func

promObjFunc().then((data) => {
  console.log(data, ",get access to the value the promise resolved with"); //I am the return value of a function ,get access to the value the promise resolved with
});

const another = () => {
  //returning the return value of promObjFunc
  //return value of promObjFunct = a  promise object with the resolved value
  return promObjFunc().then((data) => {
    console.log(data, "inside another func 1");
    return "data";
  });
};
//sync,
//since this sync, by the time it will start and end its run, value will be undefined because promiseObjFunc() or then() has not finished running yet
//for tho return the promise object containing that value
console.log(another(), "another sync console"); //Promise { <pending> } another sync console
//  at this point, the promObjFunc() may have run and returned data but the "then()" chain has not finished running and since the function returns the promise object and then chain, its state will be in "pending" because the "then()" has not run

//after a while line 40 becomes ==> I am the return value of a function inside another func 1

another() //I am the return value of a function inside another func 1
  .then((data) => {
    console.log(data, "outside of another"); //data outside of another
  });

/*
    Once a promise is called, it must either get resolved or rejected. its final state can never be pending.
    it starts off as pending then either resolved or rejected
    as long as the promise is called, it must resolve or reject, the question is when?
*/
