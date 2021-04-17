/*
    When working with React, environment variables are variables that are available through a global "process.env" Object. That global Object is provided by your environment through NodeJs. And because we don’t have NodeJs in the browser, we’re going to need webpack.

    2ways of setting environment variables
    1. NPM scripts
    2. Using .env file


    AS NPM SCRIPTS
    in your package.json, set the scripts key as shown below in a KEY=VALUE pair format
    use cross-env npm package to set the env variables for all OS

        
  // the rest of your package.json
  scripts: {
    "dev": "webpack --env.API_URL=http://localhost:8000 --config webpack.config.dev.js",
    "build": "webpack --env.API_URL=https://www.myapi.com --config webpack.config.build.js"
  } 


  to use .env, check the expensify webpack.config file, I explained it there
*/
