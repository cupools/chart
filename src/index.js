'use strict';

// import 'hidpi-canvas/dist/hidpi-canvas';
import './utils/polyfill.js';
import Pie from './type/Pie';
import Line from './type/Line';

export { Pie, Line };

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
Pie.render(ctx, {
    renderDate: [{
        count: 1,
        texture: '#f00'
    }, {
        count: 2,
        texture: '#f60'
    }, {
        count: 3,
        texture: '#6f0'
    }],
    textRadius: 110
});

if (module.hot) {
    module.hot.accept();
}
