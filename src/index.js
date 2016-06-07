require('babel-polyfill');
var page = require('page');

require('./signup');
require('./signin');
require('./homepage');
require('./client');
require('./footer');

page();