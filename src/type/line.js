'use strict';

import _ from '../utils/util';

const defaultOptions = {
    renderData: [{
        count: 1,
        name: 1
    }, {
        count: 2,
        name: 2
    }, {
        count: 3,
        name: 3
    }, {
        count: 4,
        name: 4
    }, {
        count: 5,
        name: 5
    }, {
        count: 6,
        name: 6
    }, {
        count: 7,
        name: 7
    }, {
        count: 8,
        name: 8
    }],
    width: 300,
    height: 250,
    position: [0, 50],
    padding: 40,
    minUnitWidth: 40
};

/**
 * TODO: 中间件方式绘图
 */

class Line {
    constructor(ctx, opts) {
        let options = Object.assign({}, defaultOptions, opts);
        let {renderData, position, width, height, padding, minUnitWidth} = options;

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
            sum: renderData.reduce((a, b) => (a.count ? a.count : a) + b.count),
            maxUnitCount: {
                x: _.min(Math.ceil((width - padding) / minUnitWidth), renderData.length),
                y: _.max(...renderData.map(p => p.count)) + 1
            }
        };

        this._renderData = [];
    }

    initialData() {
        let {renderData} = this.options;
        let {offsetX, maxUnitCount} = this.ctl;
        let count = maxUnitCount.x + 1;
        let data = renderData.map(p => Object.assign({}, p)).splice(offsetX, count);

        data.map((p, idx) => {
            p.position = this._axies2pos(idx, p.count);
            p.idx = idx;
        });

        this._renderData = data;
    }

    render() {
        this.initialData();

        // 绘制坐标系
        this.renderAxies();
        this.renderComment();

        // 绘制内容
        this.renderRegion();
        this.renderPoints();
        this.renderTips();
    }

    // 绘制坐标系参考线
    renderAxies() {
        let mucX = this.ctl.maxUnitCount.x;
        let mucY = this.ctl.maxUnitCount.y;

        // x轴额外绘制一个无用点，实际上增加了两个单位
        // y轴额外绘制一个无用点，两条参考线
        let expX = mucX + 1;
        let expY = mucY + 1;

        // 绘制y轴参考线
        while (expY--) {
            let start = this._axies2pos(0, expY);
            let end = this._axies2pos(expX, expY);

            this.line(start, end, {
                color: '#999'
            });
        }

        // 绘制x轴参考点
        while (expX--) {
            let start = this._axies2pos(expX, 0);
            let end = this._axies2pos(expX, 0);
            end[1] = end[1] - 5;
            this.line(start, end, {
                color: '#666'
            });
        }
    }

    // 绘制坐标系下标及内容
    renderComment() {
        let {padding} = this.options;
        let renderData = this._renderData;
        let mucY = this.ctl.maxUnitCount.y;
        let mucX = this.ctl.maxUnitCount.x;

        // x轴只绘制点集相关的下标
        // y轴额外绘制一个无用点
        let expX = renderData.length - 1;
        let expY = mucY;
        let pos = null;

        // 右下角，倒数第二个标
        pos = this._axies2pos(mucX - 1, 0);
        pos[1] = pos[1] + padding / 4 * 3;
        this.text('7月/日', pos);

        // 左上角第一个标
        pos = this._axies2pos(0, expY);
        pos[0] = pos[0] - padding / 4 * 3;
        this.text('枚/', pos);

        while (expX > -1) {
            let item = renderData[expX];
            let pos = this._axies2pos(expX, 0);

            this.text(item.name, [pos[0], pos[1] + padding / 3]);
            expX--;
        }

        while (expY > -1) {
            let pos = this._axies2pos(0, expY);

            this.text(expY, [pos[0] - padding / 3, pos[1]]);
            expY--;
        }
    }

    // 绘制折线区域
    renderRegion() {
        let points = [];
        let renderData = this._renderData;

        renderData.map(item => {
            points.push(item.position);
        });

        if (renderData.length > 1) {
            let first = [...points[0]];
            let last = [...points[points.length - 1]];

            first[1] = last[1] = this.graph.origin[1];
            points.unshift(first);
            points.push(last);

            this.polygons(points, {
                fillStyle: 'rgba(127,170,126,.3)',
                strokeStyle: 'rgb(127,170,126)'
            });
        }
    }

    // 绘制参考系文字内容
    renderTips() {
        let renderData = this._renderData;
        let len = renderData.length;

        renderData.map(item => {
            let {count, idx} = item;
            let pos = item.position;
            let offset = -12;

            if (idx > 0 && idx < len - 1 && item.count < renderData[idx - 1].count) {
                offset = 13;
            }

            pos[1] += offset;
            this.text(count, pos, {
                fillStyle: '#71b070'
            });
        });
    }

    // 绘制节点
    renderPoints() {
        let renderData = this._renderData;
        let ctx = this.ctx;

        renderData.map(item => {
            let pos = item.position;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(...pos);
            ctx.arc(...pos, 3, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#6cab6b';
            ctx.fill();
            ctx.restore();
        });
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

    line(start, end, {color, width = 1}) {
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
        let {origin} = this.graph;

        let left = origin[0] + x * this.getUnitX();
        let top = origin[1] - y * this.getUnitY();

        return [
            left,
            top
        ];
    }

    getUnitX() {
        let unitWidth = _.max(this.graph.width / this.ctl.maxUnitCount.x, this.options.minUnitWidth);
        return unitWidth;
    }

    getUnitY() {
        return this.graph.height / (this.ctl.maxUnitCount.y);
    }
}

export default {
    render(ctx, opts) {
        let graph = new Line(ctx, opts);
        return graph.render();
    }
};
