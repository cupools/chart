'use strict';

export default {
    render(ctx) {
        let renderDate = [2, 4, 6, 9];
        let radius = 100;
        let textRadius = 60;
        let pos = [250, 250];

        let sum = renderDate.reduce((a, b) => (a + b));
        let last = 0 - Math.PI / 2;

        renderDate.map((count, idx) => {
            let startAngle = last;
            let endAngle = count / sum * Math.PI * 2 + startAngle;

            ctx.save();
            ctx.fillStyle = '#00' + count;
            ctx.strokeStyle = '#00' + count;
            ctx.beginPath();
            ctx.moveTo(pos[0], pos[1]);
            ctx.arc(pos[0], pos[1], radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.save();
            let angle = (endAngle - startAngle + Math.PI) / 2 + last;
            let txt = count;
            let x = pos[0] + Math.sin(angle) * textRadius;
            let y = pos[1] - Math.cos(angle) * textRadius;
            ctx.font = '14px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(txt, x, y);
            ctx.restore();

            last = endAngle;
        });
    }
}
