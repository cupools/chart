'use strict';

import _ from '../utils/util';
import Coordinate from '../utils/Coordinate';

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
            offsetX: 1,
            sum: renderData.reduce((a, b) => (a.count ? a.count : a) + b.count),
            swipe: {
                x: 0
            },
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
        let {offsetX, maxUnitCount} = this.ctl;
        let unitCount = maxUnitCount.x + 1;
        let data = renderData.map(p => Object.assign({}, p)).splice(offsetX, unitCount);

        this.coor.clear();

        data.map((item, idx) => {
            let {name, count} = item;
            let x = idx + (offsetX === 0 ? 1 : 0);
            let y = item.count;
            let overflow = (offsetX !== 0 && idx === 0) || (idx === unitCount - 1);

            this.coor.add(x, y, {
                x,
                count,
                name,
                overflow
            });
        });
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
        let coor = this.coor;

        // 绘制y轴参考线
        while (expY--) {
            let start = coor.pos(0, expY);
            let end = coor.pos(expX, expY);

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
        let points = this.coor.points;
        let mucY = this.ctl.maxUnitCount.y;
        let mucX = this.ctl.maxUnitCount.x;
        let coor = this.coor;

        // x轴只绘制点集相关的下标
        // y轴额外绘制一个无用点
        let expX = points.length - 1;
        let expY = mucY;
        let pos = null;

        // 右下角，倒数第二个标
        pos = coor.point(mucX - 1, 0).offset(0, padding / 4 * 3).pos;
        this.text('7月/日', pos);

        // 左上角第一个标
        pos = coor.point(0, expY).offset(-padding / 4 * 3, 0).pos;
        this.text('枚/', pos);

        while (expX > -1) {
            let item = points[expX].attrs;
            pos = coor.point(expX, 0).offset(0, padding / 3).pos;
            this.text(item.name, pos);
            expX--;
        }

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
        let bottomLeft = points[0].copy().setY(0);
        let bottomRight = points[points.length - 1].copy().setY(0);

        let renderPoints = points.map(point => {
            if (point.attrs.overflow) {
                if (point.attrs.x === 0) {
                    let next = points[1];
                    let middle = coor.point((next.x + point.x) / 2, (next.y + point.y) / 2);
                    bottomLeft.setX((next.x + point.x) / 2);

                    console.log(middle);

                    return middle.pos;
                } else {
                    let prev = points[points.length - 2];
                    let middle = coor.point((point.x + prev.x) / 2, (point.y + prev.y) / 2);
                    bottomRight.setX((point.x + prev.x) / 2);

                    console.log(middle);
                    return middle.pos;
                }
            } else {
                return point.pos;
            }
        });

        if (renderPoints.length > 1) {
            renderPoints.push(bottomRight.pos, bottomLeft.pos);

            this.polygons(renderPoints, {
                fillStyle: 'rgba(127,170,126,.3)',
                strokeStyle: 'rgb(127,170,126)'
            });
        }
    }

    // 绘制参考系文字内容
    renderTips() {
        let points = this.coor.points;
        let len = points.length;

        points.map(item => {
            let {count, x, overflow} = item.attrs;
            let pos = item.pos;
            let offset = -12;

            if(!overflow) {
                if (x > 0 && x < len - 1 && count < points[x - 1].attrs.count) {
                    offset = 13;
                }

                item.offset(0, offset);
                this.text(count, item.pos, {
                    fillStyle: '#71b070'
                });
            }
        });
    }

    // 绘制节点
    renderPoints() {
        let points = this.coor.points;
        let ctx = this.ctx;

        points.map(item => {
            if (!item.attrs.overflow) {
                let pos = item.pos;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(...pos);
                ctx.arc(...pos, 3, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = '#6cab6b';
                ctx.fill();
                ctx.restore();
            }
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
        return this.graph.height / (this.ctl.maxUnitCount.y);
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
