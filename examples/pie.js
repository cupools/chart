/* global chart */
'use strict';

var Pie = chart.Pie;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
Pie.render(ctx, {
    renderDate: [{
        count: 1,
        texture: '#f00',
        outRadius: 0
    }, {
        count: 2,
        texture: '#f60'
    }]
});
