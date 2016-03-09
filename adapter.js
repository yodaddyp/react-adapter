'use strict';

require("babel-register")({
    extensions: [".jsx"],
    presets: ['react', 'es2015']
});

const Handlebars = require('handlebars');
const React      = require('react');
const ReactDOM   = require('react-dom/server');

module.exports = function(source, config){

    config = config || {};

    return {

        render: function(path, str, context){
            delete require.cache[path];
            const component = require(path);
            const element   = React.createElement(component, context);
            const html      = ReactDOM.renderToStaticMarkup(element);
            return Promise.resolve(html);
        },

        renderLayout: function(path, str, context){
            const template = Handlebars.compile(str);
            return Promise.resolve(template(context));
        }
    }
};
