'use strict'

const sin = Math.sin
const cos = Math.cos

class Circle {
    constructor(origin, radius) {
        let [posX, posY] = origin

        Object.assign(this, {
            origin,
            radius,
            posX,
            posY
        })
    }

    pos(angle) {
        let x = this.posX + sin(angle) * this.radius
        let y = this.posY - cos(angle) * this.radius
        return [x, y]
    }
}

export default Circle
