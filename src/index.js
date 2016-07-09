'use strict';

import './utils/polyfill.js';
import Hammer from 'hammerjs';
import pie from './type/pie';
import line from './type/line';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.translate(0.5, 0.5);
// line.render(ctx);

let el = line.init(ctx);
el.render();

let mc = new Hammer.Manager(canvas);
mc.add(new Hammer.Pan({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 10
}));

mc.on('panmove', function(ev) {

});

mc.on('panend pancancel', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    el.ctl.offsetX += 1;
    el.render();
});

export { pie, line };

if (module.hot) {
    module.hot.accept();
}
