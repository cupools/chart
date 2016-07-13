'use strict';

var pkg = require('../package.json');

module.exports = [
    `chart.js -- v${pkg.version} -- ${new Date().toLocaleDateString()}`,
    `${pkg.homepage}`,
    '',
    'Licensed under the MIT license'
].join('\n');
