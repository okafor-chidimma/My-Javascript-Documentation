/*
  WHY DO WE NEED ASYNCHRONOUS REDUX ACTIONS
  1. for smaller projects i.e projects that do not need to make db calls, or consume 3rd party APIs etc, synchronous redux actions serve the purpose. what do I mean by synchronous redux i.e 
    a. User interacts with our app maybe click a button
    b. An action object is dispatched to the reducer
    c. the reducer function runs and changes the store accordingly based on the type of action
    d. a change in the store causes the UI to re render so that it can be up to date with the current value of the store

  1b. to generate the action object stated in 'b', we are advised to use action generators as opposed to passing in an object every single time we need to dispatch. 
  i.e instead of 
    store.dispatch({type:'ADD_EXPENSE'}) //passing object directly
  we create a sync function whose only purpose is to return the object we ned, for e.g
    const addExpense = () => ({type:'ADD_EXPENSE'});// i implicitly returned an object
    usage ==> store.dispatch(addExpense());

  2. when the project scope increases and there is need to add db calls or external API calls, the above steps are no longer enough.
    a. it is advisable for these new features such db calls or API calls to be asynchronous so that they do not stop your application from doing other things while the calls are being made, thus improving user experience.
    b. these means that our synchronous action generators that return objects will need to be upgraded to become asynchronous to allow us make those asynchronous calls
    c. In javascript, one of the ways to make a function, asynchronous is by using the async keyword as shown below
      const addExpenseAsync = async () => {
        //perform asynchronous operations
        return {
          type: 'ADD_EXPENSE'
        }
      }; 
      ordinarily, this function should return our object but it does not, instead because of the "async" keyword it will return a promise object containing our action object, so when it is dispatched to the store, redux will complain that the object is not a "Plain Object". Event though we get to perform our asynchronous operations, the redux store will not be changed because we are not dispatching what redux is expecting.

      How do we make asynchronous calls and also change our redux accordingly? we use a middleware.

      A middleware is a plain JavaScript function that will be called with every single action that we dispatch. Inside that function, a middleware has the opportunity to stop an action from being dispatched, prevent it from going to any reducers, modify an action or manipulate an action in any way, shape or form.
      
      middleware like redux-thunk can help solve the issue but how? 

      it allows to create action generators that return a function(async or sync), that gets called internally by redux and when called performs the async operations and changes the redux store.

      for e.g
      const startAddExpense = () => {
        //this inner function gets called by redux internally with these 2 parameters
        return async (dispatch, getState) => {
          // perform async operations
          //dispatch action object to the store
          dispatch({type:'ADD_EXPENSE'}); //this is the actual dispatch that changes the store
        }

      }//returns async function, you can remove the async keyword and the function will return a normal func
      ///////////////this dispatch is not the same as the dispatch on line 42
      usage ==> store.dispatch(startAddExpense());
      
      




      
    By default, Redux action creators don’t support asynchronous actions like fetching data, so here’s where we utilise Redux Thunk. Thunk allows you to write action creators that return a function instead of a plain action object. The inner function can receive the store methods dispatch and getState as parameters, but we'll just use dispatch.

    explained further, when my action is an async function that returns a plain action object, underneath the hood, it does not return the object as expected and redux will throw error.
    So when I say to you that your action creator is not returning a plain JavaScript object, its because you have that async/await syntax. Thats why your action creator is not working as expected.

So you don't return your action object when this async action generator is initially called. So when your action creator gets called for the first time, you do not return the action object, instead as you saw, you have some code inside that returns your request object. So that is what gets returned a request. So you return the request from your action creator and that goes into the store.dispatch method.

Then the redux store looks at what was returned and says okay, is this a plain JavaScript object with only a type property? Well, in this case, no because we just returned the request object we did not return our action and thats why we ended up seeing the nasty red message saying Actions must be plain objects. So we did not return a plain object and actions must return plain objects. We returned a request object that probably has some fancy methods assigned to it and probably not a type property, so we definitely did not dispatch what we thought we were dispatching.

This is all because of the async/await syntax that you are using.

So that is issue number 1 with your action creator. As a result of using the async/await syntax which gets transpiled down to es5 code, what actually runs inside your browser is not what you think actually runs.


So we are dispatching a NOT Redux action, we are dispatching a random object that Redux does not care about.

So how do we properly make use of this middleware called Redux-Thunk? Before we answer that, let's understand what a middleware is in the world of Redux.

A middleware is a plain JavaScript function that will be called with every single action that we dispatch. Inside that function, a middleware has the opportunity to stop an action from being dispatched, prevent it from going to any reducers, modify an action or manipulate an action in any way, shape or form.

Redux-Thunk is the most popular middleware, because it helps us work with asynchronous action creators.

Okay, so how does Redux-Thunk help us solve this problem?

Well, Redux-Thunk will relax the normal action creator rules or Redux which says, as I have been saying above, that an action creator must return action objects, it must have a type property and optionally, a payload property.

There is nothing intrinsic about Redux-Thunk, it allows us to do many things, one of them being handling action creators, but its not its primary purpose.

Once we have Redux-Thunk involved in our action creator it can return plain objects OR it can return functions.

since it can return functions we have a way of making asynchronous calls now when using redux

You see where this is going?

So how does returning a function help?

So our action creator returns an "action" in the form of an object or function. That "action" will be sent to the dispatch function and eventually it will end up inside of Redux-Thunk.

Redux-Thunk will say, "hi action, are you a function or are you an object?" If the "action" tells Redux-Thunk its an object, Redux-Thunk will say, "well, thanks for stopping by, action, but I prefer to only deal with functions" and then Redux-Thunk will shove "action" towards the reducers.

Otherwise, Redux-Thunk will say, "oh so you are a function? Nice!" Redux-Thunk will then invoke your returned function and it passes the dispatch, getState functions as arguments. You were already given the syntax version of your answer, so allow me to offer a variation of it.

So instead of just this:
//without redux thunk, when we tried to convert the action generators to async function and it failed even though we are returning a plain object 
export const fetchPosts = async () => {
  const response  = await jsonPlaceholder.get('/posts');
  return {
    type: 'FETCH_POSTS',
    payload: response
  }
};

with Redux-Thunk you would include this:
//cannot use this method also, as the presence of 'async' changes the returned data of this function to a promise object
export const fetchPosts = async () => {
  return function(dispatch, getState) {
    const response  = await jsonPlaceholder.get('/posts');
    return {
      type: 'FETCH_POSTS',
      payload: response
    }
  }
};
Now in the above example I am making an asynchronous request with my action creator to an outside API. So this dispatch has unlimited powers to change the data on the Redux side of our application.

You see me utilizing getState so you can also understand that in addition to dispatch, getState will return all of the data inside of your store. These two arguments have unlimited power inside our Redux application. Through dispatch we can change any data we want and through getState we can read any data we want.

Go to the source code of Redux-Thunk itself: https://github.com/reduxjs/redux-thunk/blob/master/src/index.js

The above is all of Redux-Thunk. Only 6 to 7 lines do anything, the others are initialization steps, function declarations and export. On line 2 is a series of functions that return functions.

In the body of it, you see the logic of whats going on and it asks, did you dispatch an action and if so is it an action or a function?

Everything I described above is captured in the source code.

So for me to properly apply Redux-Thunk to the example I gave you I would go to my root index.js file and import after installing it in terminal like so:

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import App from "./components/App";
import reducers from "./reducers";

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
Notice I also imported the applyMiddleware. This function is how we connect a middleware to Redux.

So then I apply the createStore up front into a variable called store and implement that inside the Provider store like so:

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
To hook up Redux-Thunk, as a second argument I will call applyMiddleware and pass in thunk like so:

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
Then inside my action creator I make one or two changes. I can still return an normal object with a type property, that is an option, with Redux-Thunk we can still make normal action creators that return objects, but we don't have to return an action.

So rather than returning an action I can call dispatch and pass in my action object like so:
//the only right way. remove the async from the outer function, add it to the returned inner function and the outer function returns a function that is asynchronous
//but the returned inner function being asynchronous does not stop anything as the action generator still returns a function whether it is synchronous or asynchronous does not matter
//so for the asynchronous redux there are 2dispatch calls
1 is done by the component where we pass the outer function as an argument dispatch(fetchPosts())
2.  dispatch({type: 'FETCH_POSTS', payload: response }) is done by redux internally after receiving the no 1 
export const fetchPosts = () => {
  return async function(dispatch, getState) {
    const response  = await jsonPlaceholder.get('/posts');

    dispatch({type: 'FETCH_POSTS', payload: response })
  }
};
With Redux-Thunk we can use async/await syntax, because this syntax is only going to modify the return value of the inner function. Nothing from the function will ever get used. Redux-Thunk will not get a reference of what gets returned and make use of it, we can return or not return, its what we return from our outer function is what we care about.

A common way of refactoring what I just shared above is like so:

export const fetchPosts = () => {
  return async (dispatch) => {
    const response  = await jsonPlaceholder.get('/posts');

    dispatch({type: 'FETCH_POSTS', payload: })
  }
};
So if you don't make use of getState within the function, you can leave it out as an argument. You can make your code even more concise like so:

export const fetchPosts = () => async dispatch => {
    const response  = await jsonPlaceholder.get('/posts');

    dispatch({type: 'FETCH_POSTS', payload: response })
} 
You will see this in a lot of Redux projects. Thats it.





*/
