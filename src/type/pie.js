'use strict';

import _ from '../utils/util.js';

const defaultOptions = {
    renderDate: [],
    radius: 100,
    textRadius: 60,
    outRadius: 0,
    pos: [0, 0]
};

export default {
    render(ctx, opt = {}) {
        let options = Object.assign({}, defaultOptions, opt);
        let {renderDate, radius, textRadius, outRadius, pos} = options;
        let sum = renderDate.reduce((a, b) => (a.count + b.count));
        let last = 0 - Math.PI / 2;

        renderDate.map(item => _.assignWith(item, {
            radius,
            textRadius,
            outRadius
        }));

        renderDate.map(({count, outRadius, texture}, idx) => {
            let startAngle = last;
            let endAngle = count / sum * Math.PI * 2 + startAngle;
            let angle = (endAngle - startAngle + Math.PI) / 2 + last;
            let x,
                y;

            ctx.save();
            ctx.fillStyle = texture;
            ctx.strokeStyle = texture;
            ctx.beginPath();

            x = pos[0] + (radius / 2) + (outRadius ? Math.sin(angle) * outRadius : 0);
            y = pos[1] + (radius / 2) - (outRadius ? Math.cos(angle) * outRadius : 0);

            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // TODO
            ctx.save();
            let txt = count;
            x = pos[0] + (radius / 2) + Math.sin(angle) * textRadius;
            y = pos[1] + (radius / 2) - Math.cos(angle) * textRadius;
            ctx.font = '14px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(txt, x, y);
            ctx.restore();

            last = endAngle;
        });
    }
};
