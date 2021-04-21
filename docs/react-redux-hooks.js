/*
    there are 2 main hooks introduced by redux for react and they completely replace the need for connected components and mapStateToProps or mapDispatchToProps

    these new hooks are 
    1. useSelector() ==> which replaces mapStateToProps.
        when the redux store changes, all selector function defined in the application re-runs so as to have the update store value(state)
        a. this hook gets called with a function as the first required parameter. this inner function is called the selector function. the selector function is called with a state parameter and it returns the redux store or part of the redux store
        
            useSelector((state) => {
                return state; //returns the entire store, which is just an object
                return state.diet; //returns part of the store with diet property
            })

        b. as a second parameter, which is optional, the selector function gets called with a named export from redux (shallowEqual)
            i. this parameter is completely optional as redux by default does referential equality. this means that when the selector function first runs, the value is returned and the value is also stored by redux. When the redux store changes, the selector function re-runs and a new value is returned, now redux compares the old value with this new value but here is the trick:

                if the return values from the store are of value type data type such as numbers or strings or booleans, the default referential equality checks returns true if the old value equals the new one and redux returns the oldValue else it returns the newValue.

                if the return values from the store are reference type such as objects or arrays, the default referential equality check will always return false as [] === [] returns false because the values are pointing to different locations in memory even if they contain the same elements.
                By passing this shallowEqual, redux does not use the referential equality but uses this shallow equal for its check

        c. the value returned from the selector function can now be used in our component as we like
            const stateReturned = useSelector((state)=>{return state})

    2. useDispatch()==> which replaces mapDispatchToProps.
            i. this is called with no parameters
            ii. it returns a dispatch function, which the component can use to dispatch an action to the store

                const dispatch = useDispatch();

                //when the component is using it
                dispatch({
                    type: "ACTION_OBJECT"
                })


                

*/