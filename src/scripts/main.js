
// CommonJS style for Browserify
module.exports = function () {

    React.renderComponent(
        React.DOM.h1(null, 'Hello World.'),
        document.getElementById('helloworld')
    );


    /** @jsx React.DOM */
    /*React.renderComponent(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
    );*/


    /****************************************************
    ** React Comment Box Tutorial
    ** http://facebook.github.io/react/docs/tutorial.html
    ****************************************************/

     
    
}
