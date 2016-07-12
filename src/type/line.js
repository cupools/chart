'use strict';

import _ from '../utils/util';
import Coordinate from './Coordinate';
import easing from './Easing';

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
    }, {
        count: 9,
        name: 9
    }, {
        count: 10,
        name: 10
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
        let origin = [position[0] + padding, position[1] + height - padding];

        this.ctx = ctx;
        this.options = options;
        this.position = position;
        this.graph = {
            origin,
            width: width - padding,
            height: height - padding
        };
        this.ctl = {
            offsetX: 0,
            offsetLeft: 0,
            limitPos: [],
            limitIndex: [1, 6],
            sum: renderData.reduce((a, b) => (a.count ? a.count : a) + b.count),
            maxUnitCount: {
                x: _.min(Math.ceil((width - padding) / minUnitWidth), renderData.length),
                y: _.max(...renderData.map(p => p.count)) + 1
            }
        };

        let unitX = this.getUnitX();
        let unitY = this.getUnitY();

        this.coor = new Coordinate({
            origin,
            unitX,
            unitY
        });
    }

    initialData() {
        let {renderData} = this.options;
        let {limitIndex, offsetLeft} = this.ctl;
        let unitX = this.getUnitX();
        let data = renderData.map(p => Object.assign({}, p));
        let limitPos = limitIndex.map((i, idx) => this.coor.pos(i, 0)[0] + unitX / 2 * (idx ? 1 : -1) + offsetLeft);
        let offsetX = Math.round(this.ctl.offsetLeft / unitX);

        this.ctl.limitPos = limitPos;
        this.ctl.offsetX = offsetX;
        this.coor.clear();

        data.map((item, idx) => {
            let {name, count} = item;
            let x = idx + 1;
            let y = item.count;
            let overflow = 0;

            let point = this.coor.add(x, y, {
                index: idx,
                count,
                name,
                overflow,
                cross: null
            });

            if (point.posX < limitPos[0]) {
                point.attrs.overflow = -Math.ceil((limitPos[0] - point.posX) / unitX);
            } else if (point.posX > limitPos[1]) {
                point.attrs.overflow = Math.ceil((point.posX - limitPos[1]) / unitX);
            }

            if (point.attrs.overflow === -1 && data[idx + 1]) {
                let next = this.coor.point(idx + 2, data[idx + 1].count);
                let crossX = limitPos[0];
                let k = (next.posY - point.posY) / (next.posX - point.posX);
                let crossY = isFinite(k) ? point.posY + k * (crossX - point.posX) : point.posY;

                point.attrs.cross = this.coor.fromPos(crossX, crossY);
            } else if (point.attrs.overflow === 1 && data[idx - 1]) {
                let prev = this.coor.point(idx, data[idx - 1].count);
                let crossX = limitPos[1];
                let k = (prev.posY - point.posY) / (prev.posX - point.posX);
                let crossY = isFinite(k) ? point.posY + k * (crossX - point.posX) : point.posY;

                point.attrs.cross = this.coor.fromPos(crossX, crossY);
            }
        });
    }

    render() {
        this.initialData();

        // 绘制坐标系
        this.renderAxies();
        this.renderComment();

        // 绘制内容
        this.ctx.save();
        this.ctx.translate(-this.ctl.offsetLeft, 0);
        this.renderRegion();
        this.renderPoints();
        this.ctx.restore();
    }

    // 绘制坐标系参考线
    renderAxies() {
        let mucX = this.ctl.maxUnitCount.x;
        let mucY = this.ctl.maxUnitCount.y;

        // x轴额外绘制一个无用点，实际上增加了两个单位
        // y轴额外绘制一个无用点，两条参考线
        let expX = mucX + 1;
        let expY = mucY + 1;
        let coor = this.coor;

        // 绘制y轴参考线
        while (expY--) {
            let start = coor.pos(0, expY);
            let end = [this.graph.origin[0] + this.graph.width, start[1]];

            this.line(start, end, {
                color: '#999'
            });
        }

        // 绘制x轴参考点
        while (expX--) {
            let start = coor.pos(expX, 0);
            let end = coor.pos(expX, 0);

            end[1] = end[1] - 5;
            this.line(start, end, {
                color: '#666'
            });
        }
    }

    // 绘制坐标系下标及内容
    renderComment() {
        let {padding} = this.options;
        let {offsetX, limitIndex} = this.ctl;
        let mucY = this.ctl.maxUnitCount.y;
        let mucX = this.ctl.maxUnitCount.x;
        let coor = this.coor;
        let points = coor.points;

        // x轴只绘制点集相关的下标
        // y轴额外绘制一个无用点
        let expX = _.min(mucX, limitIndex[1]) - 1;
        let expY = mucY;
        let pos = null;

        // 右下角，倒数第二个标
        pos = coor.point(expX, 0).offset(0, padding / 4 * 3).pos;
        this.text('7月/日', pos);

        // 左上角第一个标
        pos = coor.point(0, expY).offset(-padding / 4 * 3, 0).pos;
        this.text('枚/', pos);

        while (expX > -1) {
            if (points[expX + offsetX]) {
                let item = points[expX + offsetX].attrs;
                pos = coor.point(expX + 1, 0).offset(0, padding / 3).pos;
                this.text(item.name, pos);
            }
            expX--;
        }

        // TODO
        while (expY > -1) {
            pos = coor.point(0, expY).offset(-padding / 3, 0).pos;
            this.text(expY, pos);
            expY--;
        }
    }

    // 绘制折线区域
    // 仅关注x轴的边界
    renderRegion() {
        let coor = this.coor;
        let points = coor.points;

        let renderPoints = points.filter(p => {
            return p.attrs.overflow === 0 || p.attrs.cross;
        }).map(p => {
            return p.attrs.cross || p;
        });

        let bottomLeft = renderPoints[0].copy().setY(0);
        let bottomRight = renderPoints[renderPoints.length - 1].copy().setY(0);

        if (renderPoints.length > 1) {
            renderPoints.push(bottomRight, bottomLeft);

            this.polygons(renderPoints.map(p => p.pos), {
                fillStyle: 'rgba(127,170,126,.3)',
                strokeStyle: 'rgb(127,170,126)'
            });
        }
    }

    // 绘制节点
    renderPoints() {
        let points = this.coor.points;
        let len = points.length;
        let ctx = this.ctx;

        points.map(item => {
            let {count, x, overflow} = item.attrs;

            if (!overflow) {
                let pos = item.pos;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(...pos);
                ctx.arc(...pos, 3, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = '#6cab6b';
                ctx.fill();
                ctx.restore();

                // 绘制节点提示
                let offset = -12;
                if (x > 0 && x < len - 1 && count < points[x - 1].attrs.count) {
                    offset = 13;
                }
                pos = item.copy().offset(0, offset).pos;
                this.text(count, pos, {
                    fillStyle: '#71b070'
                });
            }
        });
    }

    text(txt, pos, opts = {}) {
        let {fillStyle = '#999'} = opts;
        let ctx = this.ctx;
        let left = pos[0];
        let top = pos[1] + 5;

        ctx.save();
        ctx.textAlign = 'center';
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

        let len = points.length;
        while (len-- > 2) {
            ctx.lineTo(...points.shift());
        }
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();

        ctx.lineTo(...points.shift());
        ctx.lineTo(...points.shift());
        ctx.lineTo(...first);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    getUnitX() {
        let unitWidth = _.max(this.graph.width / this.ctl.maxUnitCount.x, this.options.minUnitWidth);
        return unitWidth;
    }

    getUnitY() {
        // for top tips
        return (this.graph.height - 5) / (this.ctl.maxUnitCount.y);
    }

    getOffsetLeft() {
        return this.ctl.offsetLeft;
    }

    setOffsetLeft(left) {
        let {unitX} = this.coor;
        let {limitIndex} = this.ctl;

        let min = 1 - unitX / 2;
        let max = unitX * (this.options.renderData.length - limitIndex[1] + limitIndex[0]) - unitX / 2 - 1;

        left = _.max(min, _.min(max, left));
        this.ctl.offsetLeft = left;
    }

    swipeTo(idx) {
        let unitX = this.coor.unitX;
        let offsetLeft = unitX * idx;

        easing(this.ctl).to({
            offsetLeft
        }, 600, 'easeOutQuart').change(() => {
            this.clear();
            this.render();
        }).run();
    }

    clear() {
        let {position, width, height, padding} = this.options;
        this.ctx.clearRect(...position, width + padding, height + padding);
    }

}

export default {
    init(ctx, opts) {
        return new Line(ctx, opts);
    },
    render(ctx, opts) {
        let graph = new Line(ctx, opts);
        return graph.render();
    }
};
