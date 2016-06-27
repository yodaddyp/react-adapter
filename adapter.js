'use strict';

require("babel-register")({
    extensions: [".jsx"],
    presets: ['react', 'es2015']
});


const Handlebars = require('handlebars');
const React      = require('react');
const ReactDOM   = require('react-dom/server');
const Promise    = require('bluebird');
const Adapter    = require('@frctl/fractal').Adapter;


class NunjucksAdapter extends Adapter {

    constructor(source, loadPaths) {

        super(null, source);

    }

    render(path, str, context){
        delete require.cache[path];
        const component = require(path);
        const element   = React.createElement(component, context);
        const html      = ReactDOM.renderToStaticMarkup(element);
        return Promise.resolve(html);
    }

    renderLayout(path, str, context){
        const template = Handlebars.compile(str);
        return Promise.resolve(template(context));
    }

}

module.exports = function(config) {

    config = config || {};

    return {

        register(source, app) {
            return new NunjucksAdapter(source);
        }
    }

};


// module.exports = function(source, config){
//
//     config = config || {};
//
//     return {
//
//         render: function(path, str, context){
//             delete require.cache[path];
//             const component = require(path);
//             const element   = React.createElement(component, context);
//             const html      = ReactDOM.renderToStaticMarkup(element);
//             return Promise.resolve(html);
//         },
//
//         renderLayout: function(path, str, context){
//             const template = Handlebars.compile(str);
//             return Promise.resolve(template(context));
//         }
//     }
// };
