'use strict';

import pie from './type/pie';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
pie.render(ctx);

if (module.hot) {
    module.hot.accept();
}
