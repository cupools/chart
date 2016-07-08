'use strict';

const defaultOptions = {
    renderDate: [{
        count: 3,
        name: 1
    }, {
        count: 4,
        name: 2
    }, {
        count: 6,
        name: 3
    }, {
        count: 2,
        name: 4
    }, {
        count: 5,
        name: 5
    }, {
        count: 4,
        name: 6
    }],
    width: 300,
    height: 250,
    position: [0, 50],
    padding: 40,
    unitWidth: 40
};

/**
 * TODO: 中间件方式绘图
 */

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
            origin: [position[0] + padding, position[1] + height - padding]
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
        this.renderRegion();
        this.rentderPoints();
        this.renderTips();
        this.renderComment();
    }

    renderAxies() {
        let maxX = this.ctl.maxUnitCount.x + 1;
        let maxY = this.ctl.maxUnitCount.y + 2;

        while (maxY--) {
            let start = this._axies2pos(0, maxY);
            let end = this._axies2pos(maxX, maxY);

            this.lintTo(start, end, {
                color: '#999'
            });
        }

        while (maxX--) {
            let start = this._axies2pos(maxX, 0);
            let end = this._axies2pos(maxX, 0);
            end[1] = end[1] - 5;
            this.lintTo(start, end, {
                color: '#666'
            });
        }
    }

    renderRegion() {
        let points = [];
        let {renderDate} = this.options;

        renderDate.map((item, idx) => {
            points.push(this._axies2pos(idx + 1, item.count));
        });

        let first = [...points[0]];
        let last = [...points[points.length - 1]];

        if (renderDate.length > 1) {
            first[1] = last[1] = this.graph.origin[1];
            points.push(last);
            points.unshift(first);

            this.polygons(points, {
                fillStyle: 'rgba(127,170,126,.3)',
                strokeStyle: 'rgb(127,170,126)'
            });
        }
    }

    renderTips() {
        let {renderDate} = this.options;
        let len = renderDate.length;

        renderDate.map((item, idx) => {
            let {count} = item;
            let pos = this._axies2pos(idx + 1, count);
            let offset = -12;

            if (idx > 0 && idx < len - 1 && item.count < renderDate[idx - 1].count) {
                offset = 13;
            }

            pos[1] += offset;
            this.text(count, pos, {
                fillStyle: '#71b070'
            });
        });
    }

    rentderPoints() {
        let {renderDate} = this.options;
        let ctx = this.ctx;

        renderDate.map((item, idx) => {
            let {count} = item;
            let start = this._axies2pos(idx + 1, count);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(...start);
            ctx.arc(...start, 3, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#6cab6b';
            ctx.fill();
            ctx.restore();
        });
    }

    renderComment() {
        let {renderDate, padding} = this.options;
        let {offsetX} = this.ctl;
        let maxX = this.ctl.maxUnitCount.x;
        let maxY = this.ctl.maxUnitCount.y + 2;
        let pos = null;

        pos = this._axies2pos(maxX, 0);
        this.text('7月/日', [pos[0], pos[1] + padding / 4 * 3]);

        pos = this._axies2pos(0, maxY - 1);
        this.text('枚/', [pos[0] - padding / 4 * 3, pos[1]]);

        while (maxX-- > -1) {
            let pos = this._axies2pos(maxX + 1, 0);
            let item = renderDate[maxX + offsetX];
            this.text(item ? item.name : 0, [pos[0], pos[1] + padding / 3]);
        }

        while (maxY-- > 0) {
            let pos = this._axies2pos(0, maxY);
            this.text(maxY, [pos[0] - padding / 3, pos[1]]);
        }

    }

    text(txt, pos, opts = {}) {
        let {fillStyle = '#999'} = opts;
        let ctx = this.ctx;
        let w = ctx.measureText(txt).width;
        let left = pos[0] - w / 2;
        let top = pos[1] + 5;

        ctx.font = '10px Arial';
        ctx.fillStyle = fillStyle;
        ctx.fillText(txt, left, top);
        ctx.restore();
    }

    lintTo(start, end, {color, width = 1}) {
        let ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(...start);
        ctx.lineWidth = width;
        ctx.lineTo(...end);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
    }

    polygons(points, {fillStyle, strokeStyle}) {
        let ctx = this.ctx;

        ctx.save();
        ctx.beginPath();

        let first = points.shift();

        ctx.moveTo(...first);
        points.map(point => {
            ctx.lineTo(...point);
        });
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();

        ctx.lineTo(...first);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    _axies2pos(x, y) {
        let {offsetX} = this.ctl;
        let {origin} = this.graph;

        let left = origin[0] + (x - offsetX) * this.getUnitX();
        let top = origin[1] - y * this.getUnitY();

        return [
            left,
            top
        ];
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
