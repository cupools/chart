'use strict';

import 'babel-polyfill';
import './utils/polyfill.js';
import Hammer from 'hammerjs';
import Pie from './type/Pie';
import Line from './type/Line';
import easing from './type/Easing';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.translate(0.5, 0.5);
// line.render(ctx);

let el = Line.init(ctx);
el.render();

let mc = new Hammer.Manager(canvas);
mc.add(new Hammer.Pan({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 10
}));

let flag = 0;
mc.on('panstart', function() {
    flag = el.ctl.offsetLeft;
});

mc.on('panmove', function(ev) {
    el.ctl.offsetLeft = flag + ev.deltaX / 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    el.render();
});

easing(function(current) {
    el.setOffsetLeft(current);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    el.render();
}).to(200, 2000, 'easeOutQuart').run();

mc.on('panend pancancel', function() {});

export { Pie, Line };

if (module.hot) {
    module.hot.accept();
}
