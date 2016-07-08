'use strict';

const defaultOptions = {
    renderDate: [{
        count: 2,
        name: 1
    }, {
        count: 1,
        name: 2
    }, {
        count: 6,
        name: 3
    }, {
        count: 2,
        name: 4
    }, {
        count: 3,
        name: 5
    }],
    width: 300,
    height: 250,
    position: [0, 0],
    padding: 40,
    unitWidth: 40
};

class Line {
    constructor(ctx, opts) {
        let options = Object.assign({}, defaultOptions, opts);
        let {renderDate, position, width, height, padding} = options;

        this.ctx = ctx;
        this.options = options;
        this.position = position;
        this.graph = {
            width: width - padding,
            height: height - padding,
            origin: {
                top: height - padding,
                left: padding
            }
        };

        this.ctl = {
            offsetX: 0,
            sum: renderDate.reduce((a, b) => (a.count ? a.count : a) + b.count),
            maxUnitCount: {
                x: renderDate.length,
                y: Math.max(...renderDate.map(p => p.count))
            }
        };
    }

    render() {
        this.renderAxies();
        this.renderTips();
        this.rentderPoints();
    }

    renderAxies() {
        let maxX = this.ctl.maxUnitCount.x + 1;
        let maxY = this.ctl.maxUnitCount.y + 1;

        while (maxY--) {
            let start = this._axies2pos(0, maxY);
            let end = this._axies2pos(maxX, maxY);

            this.lintTo(start, end, {
                color: '#333'
            });
        }

        while (maxX--) {
            let start = this._axies2pos(maxX, 0);
            let end = this._axies2pos(maxX, 0);
            end.top = end.top - 5;
            this.lintTo(start, end, {
                color: '#666'
            });
        }
    }

    lintTo(start, end, {color}) {
        let ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(start.left, start.top);
        ctx.lineTo(end.left, end.top);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
    }

    polygons(points, {color}) {
        let ctx = this.ctx;

        ctx.save();
        ctx.beginPath();

        let first = points.shift();

        ctx.moveTo(first.left, first.top);

        points.map(point => {
            console.log(point);
            ctx.lineTo(point.left, point.top);
        });

        ctx.lineTo(first.left, first.top);

        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    renderTips() {}

    rentderPoints() {
        let {renderDate} = this.options;
        let ctx = this.ctx;
        let points = [];

        renderDate.map((item, idx) => {
            let {count} = item;
            let start = this._axies2pos(idx + 1, count);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(start.left, start.top);
            ctx.arc(start.left, start.top, 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#f60';
            ctx.fill();
            ctx.restore();

            points.push(start);
        });

        let first = Object.assign({}, points[0]);
        let last = Object.assign({}, points[points.length - 1]);

        if (last !== first) {
            first.top = last.top = this.graph.origin.top;
            points.push(last, first);
            this.polygons(points, {color: 'rgba(255,0,0,.5)'});
        }
    }

    _axies2pos(x, y) {
        let {offsetX} = this.ctl;
        let {origin} = this.graph;

        let left = origin.left + (x - offsetX) * this.getUnitX();
        let top = origin.top - y * this.getUnitY();

        return {
            top,
            left
        };
    }

    getUnitX() {
        return this.options.unitWidth;
    }

    getUnitY() {
        return this.graph.height / (this.ctl.maxUnitCount.y + 1);
    }
}

export default {
    render(ctx, opts) {
        let graph = new Line(ctx, opts);
        return graph.render();
    }
};
