'use strict';

const defaultOptions = {
    renderDate: [{
        count: 2,
        name: 6
    }, {
        count: 4,
        name: 5
    }, {
        count: 6,
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
            max: Math.max(...renderDate.map(p => p.count))
        };

    }

    render() {
        this.renderAxies();
        this.renderTips();
        this.rentderPoints();
    }

    renderAxies() {}

    renderTips() {}

    rentderPoints() {}

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
        return this.graph.height / (this.ctl.max + 1);
    }
}

export default {
    render(ctx, opts) {
        let graph = new Line(ctx, opts);
        return graph.render();
    }
};
