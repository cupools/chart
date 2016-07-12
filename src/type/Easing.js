'use strict';

import easing from '../utils/easing';

const FPS = 30;
const requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / FPS);
        };
})();

let store = [];
heartbeat();

function heartbeat() {
    store = store.filter(e => {
        let ret = e.next();
        return !(ret && ret.done);
    });

    requestAnimationFrame(heartbeat);
}

class Easing {
    constructor(target) {
        this.stack = [];
        this.callback = null;
        this.running = false;
        this.done = false;
        this.target = target;
        this._origin = {};

        // TODO, only number
        Object.assign(this._origin, target);
    }

    to(final, duration, bezier = easing['linear']) {
        // TODO, easing function adjust
        let easingFn;

        if (bezier.length) {
            easingFn = easing[bezier] || easing['linear'];
        } else if (typeof bezier === 'function') {
            easingFn = bezier;
        }

        this.stack = function*() {
            let keyframes = Math.ceil(duration / FPS);
            let start = this._origin;
            let target = this.target;

            for (let i = 0; i <= keyframes; i++) {
                for (let key in final) {
                    if (final.hasOwnProperty(key)) {
                        let offset = final[key] - start[key];
                        let pec = i / keyframes;
                        target[key] = start[key] + offset * easingFn(pec);
                    }
                }

                yield this.callback && this.callback(target);
            }

            yield this.callback && this.callback(final);

            this.running = false;
            this.done = true;
        };

        return this;
    }

    run() {
        store.push(this.stack());
    }

    stop() {
        this.stack.splice(0, this.stack.length - 1);
    }

    change(callback) {
        if (typeof callback === 'function') {
            this.callback = callback;
        }
        return this;
    }
}

export default function(fn) {
    return new Easing(fn);
}
