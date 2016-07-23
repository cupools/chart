'use strict'

import easing from '../utils/easing'

const FPS = 30
const requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / FPS)
        }
})()

let store = []
heartbeat()

function heartbeat() {
    store = store.filter(stack => {
        let ret = stack.shift()()
        return !(ret && ret.done)
    })

    requestAnimationFrame(heartbeat)
}

class Easing {
    constructor(target) {
        this.stack = []
        this.callback = null
        this.running = false
        this.done = false
        this.target = target
        this._origin = {}

        // TODO, only number
        Object.assign(this._origin, target)
    }

    to(final, duration, bezier = easing['linear']) {
        // TODO, easing function adjust
        let easingFn
        let stack = this.stack

        if (bezier.length) {
            easingFn = easing[bezier] || easing['linear']
        } else if (typeof bezier === 'function') {
            easingFn = bezier
        }

        let keyframes = Math.ceil(duration / FPS)
        let start = this._origin

        for (let i = 0; i <= keyframes; i++) {
            let tmp = {}

            for (let key in final) {
                if (final.hasOwnProperty(key)) {
                    let offset = final[key] - start[key]
                    let pec = i / keyframes
                    tmp[key] = start[key] + offset * easingFn(pec)
                }
            }

            stack.push(() => {
                Object.assign(this.target, tmp)
                this.callback && this.callback(tmp)
            })
        }

        stack.push(() => {
            Object.assign(this.target, final)
            this.callback && this.callback(final)
            this.running = false
            this.done = true

            return {
                done: true
            }
        })

        return this
    }

    run() {
        store.push(this.stack)
    }

    stop() {
        this.stack.splice(0, this.stack.length - 1)
    }

    change(callback) {
        if (typeof callback === 'function') {
            this.callback = callback
        }
        return this
    }
}

export default function(fn) {
    return new Easing(fn)
}
