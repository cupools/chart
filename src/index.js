'use strict';

import pie from './type/pie';
import line from './type/line';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
line.render(ctx, {
    renderDate: [{
        count: 1,
        texture: '#f00',
        outRadius: 0
    }, {
        count: 2,
        texture: '#f60'
    }]
});

export {pie, line};

if (module.hot) {
    module.hot.accept();
}
