/*
CLOSURE 
    a closure is a feature in javascript that allows an inner function to have access to the variables used within its own code block that are defined and initialized in the 
    parent or outer function

    How
    the inner fxn preserves the scope of variables of the outer function in a closure of the inner function. this closure then gives it access to those variable even when 
    the outer function has finished executing

    WHY DO WE NEED CLOSURES
    to preserve the state of a local variable and also hide it from other parts of the program




ASYNC-AWAIT
    any function that has async before the function definition returns a promise that resolves with the value clearly stated by the programmer
    
    for e.g

    const myFirstArrowFuncAsync = async () =>{} //when using an arrow function
    const myFirstFuncAsync = async function(){} //when using normal function

    since I have not clearly stated what the function will return, they will both return the same thing a promise object as shown below

    console.log(myFirstArrowFuncAsync())// logs ==> Promise{undefined} ==> which is a promise object that resolves with the return data and since I did not specify what it should return, it returned undefined by default

    PS: the promise resolves with the value clearly returned by the programmer in the fxn. when you return in an async fxn, the value is not returned directly but as a promise object with the resolve value being what you returned.
    the promise returned from the async fxn rejects if there is an error and it throws that error, so the line carrying the return statement never gets to execute.
    the error thrown is caught by the catch statement

    Every async function returns a Promise object that resolves with the returned value or rejects with the error value. the await key word can only be used inside of 
    an async function.

    The await keyword can only be used on a Promise (either a clearly defined promise object as in e.g A or a promise returned as a value when a function is called as in B)

    e.g A ==> const myPromObj = new Promise((resolve,reject)=>{
        resolve("I am resolving with a string")//i can pass an object, an array as the parameter inside. anything i want    the promise to resolve with
    });
    e.g B ==> const promObjFunc = () => {
        return myPromObj;//this function when called returns a promise object
    }

    //defined my async function, so i can use await keyword
    const myFirstAsyncFunc = async ()=>{
        const resp = await promObjFunc();//the method is called, it runs and returns a promise, then the await starts waiting for it to resolve or reject;

        return resp;//resp is a promise object of the resolved value from calling the promiseObj Function 
    }

    when the await keyword is used, it waits until the Promise resolves or rejects. this means that "await" keyword can only be used on a function that returns a 
    promise object, so it waits for the promise object to resolve or reject

    HOW DO I ACCESS THE REAL RESOLVED VALUE AND NOT THE PROMISE OBJECT?
    there are 2ways we can do that
    1. by chaining a .then() to the async function. as shown below

        myFirstAsyncFunc().then((resp)=>{
            console.log(resp);//I am resolving with a string
        }).catch((error)=>{
            console.log("I have error");//only runs if there is an error
        });


    2. by awaiting the async function, as shown below
        const mySecondAsync = async () =>{
            const resp = await myFirstAsyncFunc();
            console.log(resp);//I am resolving with a string

            //if i decide to return something, it is wrapped ina promise object and the cycle explained above continues
        }


    To summarize, you can't get the result of the Promise from outside the Promise. That's part of the model of working with Promises.


    async-await is preferred to promise chaining
*/
