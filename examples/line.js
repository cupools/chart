/* global chart, Hammer */
'use strict';

var Line = chart.Line;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);

// fix canvas blur
ctx.translate(0.5, 0.5);

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
    el.setOffsetLeft(flag - ev.deltaX / 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    el.render();
});

mc.on('panend pancancel', function() {
    let {offsetX} = el.ctl;
    el.swipeTo(offsetX);
});
