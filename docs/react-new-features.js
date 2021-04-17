/*
    THE LATEST FEATURES ADDED TO REACT
    1. useState() ==> this function allows functional components to manage state within the component
        b. it is called with the initial or default state value and it returns an array where the first element is the current state value and the second element is the method that you call when you want to change the value of the state
        c. Traditionally, a state used to be an object, but in useState(), a state can be a number, a string or even an array
        d. it is advisable to call useState() as many times as you need in order to track different items in your component as opposed to calling it once and passing in an object with properties of everything you want to track
        for e.g

        const defaultStateObj = {
            count:0,
            text:'',
            notes:[]
        }
        //using use state
        //destructuring the return value which is an array, I can give it any name i like
        const [stateObj, setStateObj] = useState(defaultStateObj);//initialize useState with the default values we want to track

        stateObj ==> current state value
        setStateObj({...stateObj, count:2}) ==> called to change the value of state. it is going to be called with an object since that is what I initialized it with above
        setStateObj({count:2}) ==> can also be called this way

        No 1 usage will work for setStateObj(), will work perfectly and every property on the state will still continue to be tracked, since we are setting the state with a new object containing the prev state and the current state but it is a work around
        
        No 2 usage will replace the prev state with the new object and every other property except count will be lost

        so it is better to track the object properties separately, using as many useState() as we need for all the individual properties, as seen below

        const defaultCount = 0
        const [currCount, setCount] = useState(defaultCount)//can also be useState(0);

        const [currText, setText] = useState('')

        const [currNotes, setNotes] = useState([])
    


        
        only if i set the state with an object containing the prevState and the currentState that I want to change it to as seen in the e.g, because what ever we pass in here as the value completely replaces prevState, so if the other properties were not passed in the new state values, the state will no longer contain them an but the issue is that when one 

    2. useEffect() ==> this function allows functional components to perform actions equivalent to the lifecycle methods present in class based components such as ComponentDidMount() and ComponentDidUpdate(). can be used for both sync and async processes
        b. it gets called with a function as the first parameter(this is required) and that callback function(called effect) gets called when ever there is any change that will cause the component it was defined in to re-render and as a second parameter, an array of values that the useEffect depends(dependencies) on to run.

        c. this means that there scenarios that will trigger the call back function and they are
            i. when there are no dependencies ==> the effect runs anytime the components is rendered or anytime there is any change that will cause the component to re-render. a typical use case is shown below:

                useEffect(()=>{
                    console.log("I will run when the component is first rendered and again when there is any change that will cause the component to re-render");//since there are no dependencies, this effect will run when the component is first rendered and again when there is any change that will cause the component to re-render
                });


            ii. where an empty array of dependencies is used
            
                useEffect(()=>{
                    console.log("I only run once")
                },[])//useEffect called with the call back function and an empty array ==> this means that it will only run once, when the app is rendered, since it is not dependent on any values whether state or prop, it will not run even when a state or prop value being managed by the component changes because it was not passed into the array. this means that any state or prop change will not trigger the call back function(cause any effect)

            iii. when the effect has dependencies

                useEffect(()=>{
                    console.log("I only run when the count state changes")
                },[currCount])// this runs as many times as the count changes occur
                //it runs when the app is first rendered since the count state was initialized
                //it will run again once it detects a change in the value of count


                useEffect(()=>{
                    console.log("I only run when the count and the note states change")
                },[currCount,currNotes])// this runs as many times as the count and notes changes occur
                //it runs when the app is first rendered since the count and note states were initialized
                //it will run again once it detects a change in the value of count or the state of the notes array


            iv. when the effect returns a function , the returned function is called the clean up effect function and it runs only when the component is removed from the screen i.e only when it is unmounted

                useEffect(()=>{
                    console.log("I only run when the count and the note states change");
                    return () => {
                        console.log("I run when my component has been removed from rendering")
                    }
                },[currCount,currNotes])

                //so the above effect is runs when the component is first rendered,
                //if there is any change in the currCount and currNotes values
                //the returned function only runs when the component is removed or unmounted from rendering
            
            
    PS: you can use as many useEffects as you want in your component

            

*/
/*


for instance, 
                when the app first renders, the state is initialized with the default values, so the call back function runs (equivalent to componentDidMount())
                when there is any change in the state value, it runs again
        this can be explained with the following (equivalent to componentDidUpdate())
                when a component is removed, it runs again (equivalent to componentDidUnMount()) => when this happens, it is referred to as cleaning up an effect
        
*/