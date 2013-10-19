// HTML5 Boilerplate main.js

// async load libs
// http://www.requirejs.org/docs/start.html
require([
    "lib/jquery", 
    "lib/bootstrap", 
    "lib/react", 
    "lib/JSXTransformer", 
    "lib/d3", 
    "plugins"
], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    
    // test load success 
    //alert("require.js loaded");

    React.renderComponent(
        React.DOM.h1(null, 'Hello World.'),
        document.getElementById('helloworld')
    );
});
