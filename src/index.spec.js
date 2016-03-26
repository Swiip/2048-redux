
/* globals require */
const context = require.context('./app', true, /\.spec$/);
context.keys().forEach(context);
