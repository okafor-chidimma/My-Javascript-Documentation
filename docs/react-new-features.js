/*
the prev versions of react, a functional component was just a presentational component that did not have state, you cannot even use lifecycle methods in them. they were purely dumb and for presentational purposes only.
However, react has added new features that will allow functional components to do things that could only be done with class components. things such as Maintaining State, Using methods that can be equivalent to life cycle methods in a class



THE LATEST FEATURES ADDED TO REACT
A. HOOKS ==> Hooks are basically functions that let us include react state and lifecycle features without using Classes, and organize the logic inside a component into reusable, isolated units. Basically it allows us create Functional Stateful Components


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

    
    3. useReducer() ==> this function allows you to manage state in a complex way inside of a component
                b. when the component just requires simple state mgt, for e.g setState to add a title, you can use setState() since it is not a complex action but in a situation where you want to do different things to alter the state value depending on an action type, use useReducer()
                c. the complexity of the different actions is taken away and handled for you and your component is only concerned with dispatching actions where necessary
                d. it accepts 2 parameters : reducer function and the action object, just like in redux
                e. it returns the current state and a dispatch function


    4. useContext() and the context API ==> this is used to pass data around within a react app. instead of using props to pass data around from parent to children, these are used to pass the data
                b. steps to using this
                    i. initialize the context which gives you access to the context object
                        //can be any name i want e.g expenseContext
                        const NotesContext = React.createContext()

                        the NotesContext is an object that contains 2components
                        Provider and Consumer but we will be using only the Provider as useContext API makes the values available to the components

                    ii. use the provider to wrap the parent component that has the values you want to pass
                        PS: also note that I can define my values in another file, import it into the file that the provider and pass it in as values

                        <NotesContext.Provider value={{ notes, dispatch }}>
                            <h1>Notes</h1>
                            <NoteList/>
                            <AddNoteForm/>
                        </NotesContext.Provider>

                        value can either be a single value or incase i have multiple things i wold like to share, i pass in an object with those property values as shown above

                    iii. the use the provided values, go to the component that needs it and call the useContext() hook

                    //using the value in NoteList component
                    const NoteList = () => {
                        //since i passed in an object as the value, I can de-structure it to have access to notes which is value that is passed
                        const { notes } = useContext(NotesContext)

                        return notes.map((note) => (
                            <Note key={note.title} note={note}/>
                        ))
                    }
        5. Creating custom hooks ==>
                    a. what is a custom hook? this is just a synchronous function you create that calls all or some of the already defined react hooks and as a naming convention, always start the name of your custom hook with "use"

                    b. when do you create custom hooks: 
                        i.  when there is a logic or lines of code that you want to use more than once
                        ii. when you want to remove or abstract logic that has nothing to do with the component
                        iii. for e.g If there is an api request that I will make quite frequently in other components, we could break it into its own custom Hook and this can help even more so with readability


                    c. How do you create? below I have created a useFetch() which can be called a useFetch hook

                    // useFetch.js
                    import { useState, useEffect } from "react";

                    export default useFetch(url) => {
                        //using the useState react hook
                        const [data, setData] = useState([]);

                        async function getData() {
                            const response = await fetch(url);
                            const data = await response.json();
                            setData(data);
                        }
                        
                        //using the useEffect hook

                        useEffect(() => {
                            getData();
                        }, []);

                        return data;
                    }

*/
/*


for instance, 
                when the app first renders, the state is initialized with the default values, so the call back function runs (equivalent to componentDidMount())
                when there is any change in the state value, it runs again
        this can be explained with the following (equivalent to componentDidUpdate())
                when a component is removed, it runs again (equivalent to componentDidUnMount()) => when this happens, it is referred to as cleaning up an effect
        
*/
