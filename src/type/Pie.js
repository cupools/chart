'use strict';

import _ from '../utils/util';
import Circle from './Circle';

const PI = Math.PI;

const defaultOptions = {
    renderDate: [],
    radius: 100,
    textRadius: 120,
    outRadius: 0,
    position: [160, 160]
};

export default {
    render(ctx, opt = {}) {
        let options = Object.assign({}, defaultOptions, opt);
        let {renderDate, radius, textRadius, outRadius, position} = options;
        let sum = renderDate.reduce((a, b) => (a.count + b.count));
        let last = 0 - PI / 2;

        renderDate.map(item => _.assignWith(item, {
            radius,
            textRadius,
            outRadius
        }));

        renderDate.map(({count, outRadius, texture}, idx) => {
            let startAngle = last;
            let endAngle = count / sum * PI * 2 + startAngle;
            let angle = (endAngle - startAngle + PI) / 2 + last;
            let x,
                y;

            ctx.save();
            ctx.fillStyle = texture;
            ctx.strokeStyle = texture;
            ctx.beginPath();

            [x, y] = new Circle(position, outRadius).pos(angle);

            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // TODO, static angle
            let pos;

            ctx.save();
            ctx.fillStyle = '#333';
            ctx.strokeStyle = '#333';

            ctx.beginPath();
            pos = new Circle(position, radius / 2 + outRadius).pos(angle);
            ctx.moveTo(...pos);
            pos = new Circle(position, textRadius + outRadius).pos(angle);
            ctx.lineTo(...pos);
            pos[0] = pos[0] + (idx ? -15 : 15);
            ctx.lineTo(...pos);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(...pos);
            ctx.arc(...pos, 3, 0, PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = '#333';
            ctx.fill();

            let txt = count + '枚';
            pos[0] = pos[0] + (idx ? -6 : 6);
            pos[1] = pos[1] + 5;
            ctx.moveTo(...pos);
            ctx.font = '10px Arial';
            ctx.textAlign = idx ? 'right' : 'left';

            console.log(ctx.textAlign);
            ctx.fillStyle = '#333';
            ctx.fillText(txt, ...pos);
            ctx.restore();

            last = endAngle;
        });
    }
};
