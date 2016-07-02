'use strict';

import { data } from '../data/sex.js';

export default {
    render(ctx) {
        let renderDate = [1, 3, 6, 9];
        let sum = renderDate.reduce((a, b) => (a + b));

        let last = 0 - Math.PI / 2;

        renderDate.map((count, idx) => {
            let startAngle = last;
            let endAngle = last = count / sum * Math.PI * 2 + startAngle;

            ctx.save();
            ctx.fillStyle = '#00' + count;
            ctx.strokeStyle = '#00' + count;
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 100, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        })
    }
}
