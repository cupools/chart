'use strict';

const defaultOptions = {
    renderDate: [{
        count: 3
    }, {
        count: 6
    }],
    width: 300,
    height: 200,
    pos: [150, 100]
};

export default {
    render(ctx, opt) {
        let options = Object.assign({}, defaultOptions, opt);
        let {renderDate, pos} = options;
        let sum = renderDate.reduce((a, b) => a.count + b.count);
    }
};
