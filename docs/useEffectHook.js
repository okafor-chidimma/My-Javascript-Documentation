/*
    useEffect() ==>this is a Hook(i.e a Function) that allows you to perform side-effects in functional components.

    it is common practice in class components to define our methods inside the component but if we do this in a functional component, the method wil be declared each time the functional component re-renders.

    why the difference? for class based component, the methods defined inline are registered once and the component has a way of maintaining its previous state and only changing the jsx to reflect new values when re-rendering while for functional, when re-rendering, the function is called and since functional components have no way of preserving given that when a function finishes execution, all the variables or whatever that was declared are lost so the component(which is just a function) will not know what has been declared before during re-rendering(re-rendering just calls the function or component again, so the variables are declared again), it declares every single thing again, which includes the functions or variables declared within the function body.

    so you are advised not to declare your methods directly in the functional component's scope but within a useEffect();

   So The Effect hook (useEffect()) is where we put "side effects".

    In React-y terms, side effects means "when a component's variables or state changes based on some outside thing". For example, this could be:

        When a component receives new props that change its state
        When a component makes an API call and does something with the response (e.g, changes the state)
        when a component directly change the DOM i.e it has changed the value of a variable declared outside of its scope


    So why is it called a side effect? Well, we cannot be sure what the result of the action will be. We can never be 100% certain what props we are going to receive, or what the response from an API call would be. And, we cannot be sure how this will affect our component.

    Sure we can write code to validate, and handle errors, and so on, but ultimately we cannot be sure what the side effects of said things are.

    So for example, when we change state, based on some outside thing this is know as a side effect.

    When using functional components we no longer have access to life cycle methods like componentDidMount(), componentDidUpdate() etc. So, in effect (pun intended), the useEffect hooks replace the current React Life Cycle hooks.

    it's important to know that, by default, the useEffect hook runs on every render and re-render. So whenever the state changes in your component or your component receives new props, it will re-render and cause the useEffect hook to run again. By Using this hook, we are telling react that our component needs to do something after it has rendered. this means that this piece of code (the effect) won’t affect the component until after the initial render. React will remember the function we passed, and call it later after performing the initial rendering of the component and subsequently after any update that will cause the component to re-render. 


    FURTHER EXPLANATION ON USE EFFECT()

    a. this function allows functional components to perform actions equivalent to the lifecycle methods present in class based components such as ComponentDidMount() and ComponentDidUpdate(). can be used for both sync and async processes

    b. it gets called with a function as the first parameter(this is required) and that callback function(called effect) gets called first when the components renders for the first time and when ever there is any change that will cause the component it was defined in to re-render and as a second parameter, an array of values that the useEffect depends(dependencies) on to run.

    c. By default, the effect runs after every render, and the behaviour of this can be controlled to implement lifecycle methods.

    d. this means that there are scenarios that will trigger the call back function(effect).they are
        i. when there are no dependencies ==> the effect runs anytime the components is rendered or anytime there is any change that will cause the component to re-render. 
        
        
        
        a typical use case is shown below:

            useEffect(()=>{
                console.log("I will run when the component is first rendered and again when there is any change that will cause the component to re-render");//since there are no dependencies, this effect will run when the component is first rendered and again when there is any change that will cause the component to re-render
            });


        ii. where an empty array of dependencies is used
        
            useEffect(()=>{
                console.log("I only run once")
            },[])//useEffect called with the call back function and an empty array ==> this means that it will only run once, when the component is rendered, since it is not dependent on any values whether state or prop, it will not run even when a state or prop value being managed by the component changes because it was not passed into the array. this means that any state or prop change will not trigger the call back function(cause any effect). Basically, By doing this, the function passed in useEffect will always run for the first time but for subsequent re-renders it would not re-run as the value of the array would not change.

            This is equivalent to componentDidMount() life cycle method

        iii. when the effect has dependencies and this is equivalent to componentDidUpdate() life cycle method
             In this scenario, the useEffect hook will run on the first load as always. Whenever your component receives a new name prop from its parent, the useEffect hook will be triggered, and the code within it will run.

             PS. the useEffect() will be triggered after the component has re-rendered

            We can do the same thing with state variables as seen below

            useEffect(()=>{
                console.log("I only run when the count state changes")
            },[currCount])// this runs as many times as the count changes occur
            //it runs when the app is first rendered since the count state was initialized
            //it will run again once it detects a change in the value of count


            Whenever the currCount variable changes, the component re-renders and the useEffect hook will run and output the message. 
            
            Since this is an array, we can add multiple things to it:


            useEffect(()=>{
                console.log("I only run when the count and the note states change")
            },[currCount,currNotes])// this runs as many times as the count and notes changes occur
            //it runs when the app is first rendered since the count and note states were initialized
            //it will run again once it detects a change in the value of count or the state of the notes array


        iv. when the effect returns a function , the returned function is called the "clean up effect" function and it runs 
            a. Before useEffect runs the next time
            b. when the component is removed from the screen i.e when it is unmounted but the logic inside the function passed in the hook(effect) would not be executed or the logic in the return function(in the clean up function)

            useEffect(()=>{
                console.log("I only run when the count and the note states change");
                return () => {
                    console.log("Cleaning Up Effect")
                }
            },[currCount,currNotes])

            //so the above effect is runs when the component is first rendered, and outputs
                "I only run when the count and the note states change"

            //if there is any change in the currCount and currNotes values, the clean up function runs first and then the effect runs again, so the output becomes
                "Cleaning Up Effect"
                "I only run when the count and the note states change"

            //when the component is removed or unmounted, only the clean up function runs, so the output becomes
                "Cleaning Up Effects"
        
        
    PS: you can use as many useEffects as you want in your component.
    A variable, a function or a prop can be added to the useEffect dependency array. recall that when the value of the state variable or prop changes, the effect re-runs. however since a function is a reference type, the effect will re-run when the function's reference changes.

    what does it mean for the reference to change?
    when the new instance does not point to the same location in memory. for e.g

    const a = () => 1 + 1;
    const b = () => 1 + 1;
    const c = a;

    c === a because they contain the same function declaration and most importantly, they are pointing to the same location in memory

    b !== a and b !== c because even though they contain the same function declaration, they are pointing to different locations in memory

    so if we pass "a" in the dependency array the first time and later change "a" to "c", the effect will not fire since they are pointing to the same location in memory, however, if we pass in "b", the system will see it as new and re-run because "b" is pointing to a different location in memory

    it is also worth noting that when using useEffects or other hooks(e.g useCallback()) that accept dependency array, together with eslint react hooks rule, the lint rule would enforce for you to add to the dependency arrays all the variables or functions (reference) used in the effect() which were not declared within the effect scope block because the lint just sees that you're using something inside the hook, and flags that as something that could hypothetically change and therefore needs to be in the deps array.

    consider this:
    function ExampleComponent({url}) {
        useEffect(() => {
            const fetchData = (url) => {
            // fetch call here
            }

            fetchData(url)
        }, [url]);
        return (<div></div>);
    }

    fetchData was declared within the effect's function block, so the lint will not ask to add the reference to the dependency array, how ever it will ask that you add "url" because it is coming from outside of the function scope

    function ExampleComponent({url}) {
        const fetchData = (url) => {
        // fetch call here
        }
        useEffect(() => {
            fetchData(url)
        }, [url, fetchData]);
        return (<div></div>);
    }

    since fetchData was declared outside of the effect's function scope, the lint will force you to add its reference to the dependency array


        
*/