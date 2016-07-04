'use strict';

export default {
    render(ctx) {
        let renderDate = [2, 2, 4];
        let radius = 100;
        let textRadius = 60;
        let outRadius = 10;
        let pos = [250, 250];

        let sum = renderDate.reduce((a, b) => (a + b));
        let last = 0 - Math.PI / 2;

        renderDate.map((count, idx) => {
            let startAngle = last;
            let endAngle = count / sum * Math.PI * 2 + startAngle;
            let angle = (endAngle - startAngle + Math.PI) / 2 + last;
            let x, y;

            ctx.save();
            ctx.fillStyle = '#00' + count;
            ctx.strokeStyle = '#00' + count;
            ctx.beginPath();
            x = pos[0] + Math.sin(angle) * outRadius;
            y = pos[1] - Math.cos(angle) * outRadius;

            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.save();
            let txt = count;
            x = pos[0] + Math.sin(angle) * textRadius;
            y = pos[1] - Math.cos(angle) * textRadius;
            ctx.font = '14px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(txt, x, y);
            ctx.restore();

            last = endAngle;
        });
    }
}
