'use strict';

import './utils/polyfill.js';
import pie from './type/pie';
import line from './type/line';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.translate(0.5, 0.5);
line.render(ctx);

export {pie, line};

if (module.hot) {
    module.hot.accept();
}
