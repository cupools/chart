'use strict';

import './utils/polyfill.js';
import Pie from './type/Pie';
import Line from './type/Line';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.translate(0.5, 0.5);

ctx.clearRect(0, 0, canvas.width, canvas.height);
Pie.render(ctx, {
    renderDate: [{
        count: 11,
        texture: '#6c0',
        outRadius: 10
    }, {
        count: 2,
        texture: '#f60'
    }]
});

export { Pie, Line };

if (module.hot) {
    module.hot.accept();
}
