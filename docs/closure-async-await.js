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


    HOW CAN WE CALL AN ASYNC FUNCTION
    1. without await keyword
    2. with await keyword //must be done inside an async function

    FROM STACK OVERFLOW
    "An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value"

    Let's say you have a function B that is supposed to do a bunch of axios calls in a synchronous manner (because each calls depends on the other one or something). You need to use await in front of every axios call. But at the same time, it means you have to put async in front of B. If I want to be able to just trigger B (when you press some button let's say) from another function A (that's not async), you'll just call B and not use await. So here you go, async function without await


    WITHOUT AWAIT KEYWORD
        when we call an async function without the await keyword, it executes synchronously.
        what do i mean by this, take for instance

        //a function that returns a promise
        function main() {
            return new Promise( resolve => {
                console.log(3);
                resolve(4);
                console.log(5);
            });
        }

        //an async function that executes main()
        async function f(){
            console.log(2);
            //every line after await, is put inside an event queue
            let r = await main();
            console.log(r);
        }

        console.log(1);
        //I am calling my async function without the await keyword, so it run synchronously. line by line must execute
        f();
        console.log(6);

        //output is
        1
        2
        3
        5
        6
        4

        why this output
        1. the first console.log prints ==> 1
        2. the f() begins to execute 
            a.inside f(),the second console.log prints ==> 2
            b. await keyword forces function f() execution to pause until main() finishes execution. main() starts executing, while f()pauses so,
            c. the third console, ==> 3
            d. the promise resolves 
            e. the 4th console prints ==> 5 //since we are still executing main()
            f. now main has completed and it returned a value but the because of the await keyword, f() still being paused, everything within f() block but after the await keyword is put in an event queue, so the r does not print
            g. the 6th console prints ==> 6
            f. now the entire code has finished, the system will check if there is anything pending in the event queue, it will see that f() has not completed, so it continues the execution and
             console.log(r) prints ==> 4


        //check the same process out without the awaiting main()
        function main() {
            console.log(3);
            return 4;
        }

        async function f(){
            console.log(2);
            let r = main();
            console.log(r);
        }

        console.log(1);
        f();
        console.log(5);

        //output
        1
        2
        3
        4
        5

        //because there is no await in front of main, everything after it is not put in an event queue, they execute synchronously
*/
