/*
CLOSURE 
    a closure is a feature in javascript that allows an inner function to have access to the variables used within its own code block that are defined and initialized in the parent or outer function

    How
    the inner fxn preserves the scope of variables of the outer function in a closure of the inner function. this closure then gives it access to those variable even when the outer function has finished executing

    WHY DO WE NEED CLOSURES
    to preserve the state of a local variable and also hide it from other parts of the program




ASYNC-AWAIT/PROMISES
    A promise is said to have been handled when either the resolve() or reject() has been called and it has finished executing. resolving with a value or rejecting with an error

    any function that has async before the function definition returns a promise that resolves with the value clearly stated by the programmer
    
    for e.g

    const myFirstArrowFuncAsync = async () =>{} //when using an arrow function
    const myFirstFuncAsync = async function(){} //when using normal function

    since I have not clearly stated what the function will return, they will both return the same thing a promise object as shown below

    console.log(myFirstArrowFuncAsync())// logs ==> Promise{undefined} ==> which is a promise object that resolves with the return data and since I did not specify what it should return, it returned undefined by default

    PS: the promise resolves with the value clearly returned by the programmer in the fxn. when you return in an async fxn, the value is not returned directly but as a promise object with the resolve value being what you returned.
    the promise returned from the async fxn rejects if there is an error and it throws that error, so the line carrying the return statement never gets to execute.
    the error thrown is caught by the catch statement

    Every async function returns a Promise object that resolves with the returned value or rejects with the error value. the await key word can only be used inside of an async function.

    The await keyword can be used on a Promise (either a clearly defined promise object as in e.g A or a promise returned as a value when a function is called as in B), an expression, a regular function that does not return a promise, basically anything

    WHAT DOES THE "AWAIT" KEYWORD DO
    1. it waits until that expression evaluates, or the promise resolves or the sync function completes execution
    2. it pauses the execution of other lines of code that exist within that async function block by adding them to the event queue. however, other lines of code outside the async function block continues executing synchronously

    e.g A ==> const myPromObj = new Promise((resolve,reject)=>{
        resolve("I am resolving with a string")//i can pass an object, an array as the parameter inside. anything i want    the promise to resolve with
    });
    e.g B ==> const promObjFunc = () => {
        return myPromObj;//this function when called returns a promise object that has started executing
    }

    //defined my async function, so i can use await keyword
    const myFirstAsyncFunc = async ()=>{
        const resp = await promObjFunc();//the method is called, it runs and returns a promise that has started executing, then the await starts waiting for it to resolve or reject;

        return resp;//resp is a promise object of the resolved value from calling the promiseObj Function 
    }

    when the await keyword is used, it waits until the Promise resolves or rejects. 

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

            //if i decide to return something, it is wrapped in a promise object and the cycle explained above continues
        }


    To summarize, you can't get the result of the Promise from outside the Promise. That's part of the model of working with Promises.


    async-await is preferred to promise chaining


    HOW CAN WE CALL AN ASYNC FUNCTION
    1. without await keyword
    2. with await keyword //must be done inside an async function


    WITHOUT AWAIT KEYWORD
        when we call an async function without the await keyword, it executes synchronously.
        what do i mean by this, take for instance

    //#region 
        //declaring a function that returns a promise
        function main() {
            return new Promise( (resolve) => {//executor fxn
                console.log(3);
                resolve(4);
                console.log(5);
            });
        }

        //function declaration of an async function that executes main()
        async function f(){
            console.log(2);
            
            let r = await main();
            //every line after await, is put inside an event queue
            console.log(r);
        }

        console.log(1);
        //I am calling my async function without the await keyword, so it run synchronously. line by line must execute
        f();
        console.log(6);
        console.log(7);
        console.log(8);
        console.log(9);

        //output is
        1
        2
        3
        5
        6
        7
        8
        9
        4
    //#endregion

        why this output
        1. the first console.log prints ==> 1
        2. the f() begins to execute 
            a.inside f(),the second console.log prints ==> 2 and goes to the next line

            b. await keyword forces function f() execution to pause until what ever that is returned from main() finishes execution and gives a result but it starts main() immediately. main() starts executing, while f()pauses. Also all the remaining lines of code after await inside the async code block are added to the events queue and executed in the next batch

            c. recall that main() is sync and it will be called immediately in a sync manner, it returns a promise object that has started,the status of this promise may still be pending, it may or may not have been resolved by the time it is returned but in summary the main() returns a promise object of the status (Promise{<pending>}) if it is still pending or with the resolved value wrapped in a promise object(Promise{4}). 

            HOW DOES IT KNOW WHAT KIND OF PROMISE OBJECT TO RETURN
                in our e.g the promise executor function(the inner function that gets called with resolve and reject) runs, evaluates the first console.log() ==> prints 3, moves to the next line and calls resolve() but does not wait for the resolve() to complete before moving to the next line hence the async method of executing, runs the next console.log() ==> prints 5,  by the time the console.log() is done, the resolve() has finished executing ==> resolves with 4, so main() returns a promise object ==> Promise{ 4 }

                PS: in some functions, you may finish all sync code inside the executor fxn and still the resolve function may not have been completed or even been called because for instance the condition for it to be called may not have been met and in that case, main() will return Promise{<pending>}

                Overall main() must return a promise object once it has finished executing all the lines of code in the executor() of the promise

            d. Now the "await" tries to unwrap the promise object to expose the resolved value which in our e.g is 4 in the async function block. for it to do this unwrapping, it means that the promise must have been resolved, if not it just waits for it to resolve, hence pausing f()'s execution. it is worth noting that even if the promise resolves immediately like in our e.g and main() returns our resolved value wrapped in a promise object, the unwrapping does not begin until, the entire line of code in the global space has finished executing  because everything in that async body after meeting the await has been added to the event loop

            e. Since f() is on hold, control is given back to the global space and it continues executing, so it prints the next console.log() ==> prints 6

            f. continues executing all the other console.logs() printing each number on a new line ==> 7 8 9

            g. once it has completely run all the codes in the global space, it will check the event queue and see that 
                f() has not finished and also that the promise has been resolved, remaining unwrapping, it will resume executing f() and so the console.log(r) will run ==> printing 4 to the screen


            
            
            WHY DOES THE MAIN() FUNCTION'S RETURNED PROMISE START EXECUTING WHEN WE USED AWAIT IN F()
                main() is sync, so when called (which is this line await main()), executes immediately, returns the promise object which has an executor function which has also started executing. this is further explained below:
            
                i. a promise object is called with a function(called the executor function, although the executor fxn can be async or sync however, you are advised to never ever make it async) as the only argument, this executor fxn is called with 2 parameters resolve and reject, which are call back functions
                ii. using our e.g main() has been called, which returns a promise that has started. by starting it means that the executor function has started running, and it will run synchronously until it meets a callback function, sees that the callback function was called (resolve()), starts executing resolve but does not wait for it to finish executing before moving to the next line to continue its sync execution
                In our case, inside the executor function,
                    A. it sees console.log() ==> runs it synchronously ==> prints 3
                    B. next line, it sees the resolve ==> a callback fxn and it sees it has been called ==> starts executing it but does not wait
                    C. next line, it sees console.log() ==> runs it synchronously ==>prints 5
                    D. no next line in main(), by now the resolve() has finished running. 
                    E. it returns with our resolved value wrapped in a promise object ==> Promise { 4 }

                    PS. A promise executor fxn starts looking for resolve() or reject() while executing lines of code but does not wait until it finds either one before returning.  in our main(), the resolve() was just in the function body, so it saw immediately and it started it while still continuing from the next line. Below is an e.g where the resolve() was nested in another code block

                    //an e.g where the resolve is nested in child function block
                    function mainNestedChild() {
                        console.log(10);
                        return new Promise( resolve => {
                            console.log(3);
                            setTimeout(function() {
                                resolve(4);
                            }, 5000);
                            console.log(5);
                        });
                    }

                    here, the executor fxn runs prints 3,
                    goes to next line and sees setTimeOut(), since it a call back, it starts it but does not wait
                    goes to the next line, prints 5.
                    it sees there is no more line of code and it has still not seen the resolve() or the reject() but it does not wait, it returns a promise object of pending (Promise{<pending>})

                    now if you await mainNestedChild(), it will see that even though a promise object ws returned, the promise is still pending, so it will wait for the resolve() to be called and for it to finish before trying to unwrap it. while it waits, it does not hold control. it will return it to the calling function (i.e where on the document, the async function was called) which is sometimes the global space.
                    the global space continues executing its remaining lines of code until it has reached the end
                    

                    //another e.g of nested resolve()
                    function mainNeverResolvedProm() {
                        console.log(11);
                        return new Promise( resolve => {
                            console.log(3);
                            let hasTimeReached =false;
                            setTimeout(function() {
                                hasTimeReached = true;
                                console.log(hasTimeReached);

                            }, 10);
                            //this is synchronous so by the time it will execute, the set time out has not finished. so 
                            //this promise never resolves of reject
                            if(hasTimeReached){
                                resolve(4);//never runs
                            }
                            console.log(5);
                        });
                    }

                    here, this promise never resolves(i.e the resolve() never gets called) because by the time the executor function will run the if condition, even though it has started the setTime(), the setTimeOut() has not completed which means that the variable "hasTimeReached" would still be false and since the condition is not met, the block of code inside does not execute and it will never re-run that line again.

                    Due to the presence of await, f() will never complete since it is waiting for the promise to resolve which will never happen


            c. Now the global scope has control, continues executing the remaining lines of code synchronously until it meets another callback, it sees a console.log() ==> prints 6
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

        IN SUMMARY
        1. Javascript executes lines of code synchronously, the next line cannot start until the previous line has completed execution, i.e line by line and it executes this in batches but starting out, it adds everything to batch 1
        2. When the document starts running either via node or browser, all the lines of code are added to the first round of execution
        3. once it gets to a callback or an awaited evaluation for e.g an async operation, it starts the process but does not wait for it to complete and this automatically adds that line to the next round of execution batch 2
        4. Continues executing those line that have not be executed that are still in batch 1, if it encounters more async operations adds them to batch 2
        5. finishes all lines in batch 1 (this happens when it executes the last line on the document), it starts with batch 2 because by now it should have completed what it started since.
        6. it starts executing batch 2, line by line, if it meets one from batch 1 that has not finished, adds it to batch 3, if it meets an async operation, it starts this process but does not wait and it automatically added to batch 3, while it continues executing all lines in batch 2, once it is done with batch 2, it moves to batch 3 and starts the execution as it did for batch 2 until every evaluation is completely executed
*/
