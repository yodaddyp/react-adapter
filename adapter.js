'use strict';

const React    = require('react');
const ReactDOM = require('react-dom/server');
const _        = require('lodash');

module.exports = function(source, config){

    config = config || {};

    // let viewsLoaded = false;
    // let views = {};

    // function loadViews(source) {
    //     if (viewsLoaded) {
    //         for (let view of views) {
    //
    //         }
    //     }
    //     for (let item of source.flattenDeep()) {
    //
    //     }
    //
    //     viewsLoaded = true;
    // }

    // source.on('loaded', loadViews);
    // source.on('changed', loadViews);

    return {
        render: function(path, str, context, meta){
            delete require.cache[path];
            const component = require(path);
            const element   = React.createElement(component, context);
            const html      = ReactDOM.renderToStaticMarkup(el);
            return Promise.resolve(html);
        }
    }
};
