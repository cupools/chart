'use strict';

import easing from '../utils/easing';

const FPS = 60;
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

check();

function check() {
    store = store.filter(e => {
        let ret = e.next();
        return !(ret && ret.done);
    });

    requestAnimationFrame(check);
}

class Easing {
    constructor(target) {
        let callback;

        if (typeof target === 'function') {
            callback = function(current) {
                return target(current);
            };
        }

        this.callback = callback;
        this.stack = [];
        this.running = false;
        this.done = false;
    }

    to(final, duration, bezier = easing['linear']) {
        // TODO
        let easingFn;

        if (bezier.length) {
            easingFn = easing[bezier] || easing['linear'];
        } else if (typeof bezier === 'function') {
            easingFn = bezier;
        }

        this.stack = function * () {
            let keyframes = Math.ceil(duration / FPS);

            for (let i = 0; i < keyframes; i++) {
                let pec = i / keyframes;
                let current = final * easingFn(pec);
                yield this.callback(current);
            }

            yield this.callback(final);

            this.running = false;
            this.done = true;
            return {
                done: true
            };
        };

        return this;
    }

    run() {
        store.push(this.stack());
    }

    stop() {
        this.stack.splice(0, this.stack.length - 1);
    }
}

export default function(fn) {
    return new Easing(fn);
};
