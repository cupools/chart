'use strict'

let id = 0

class Point {
    constructor(x, y, attrs = {}, props) {
        this.x = x
        this.y = y
        this.attrs = attrs
        this.props = props

        this.id = id++
        this.pos = []
        this.posX = 0
        this.posY = 0
        this.calculate()
    }

    calculate() {
        let {x, y} = this
        let {origin, unitX, unitY} = this.props

        this.posX = origin[0] + unitX * x
        this.posY = origin[1] - unitY * y
        this.pos = [this.posX, this.posY]
    }

    setX(x) {
        this.x = x
        this.calculate()
        return this
    }

    setY(y) {
        this.y = y
        this.calculate()
        return this
    }

    offset(left, top) {
        let {origin, unitX, unitY} = this.props

        this.posX += left
        this.posY += top
        this.x = (this.posX - origin[0]) / unitX
        this.y = (origin[1] - this.posY) / unitY

        this.pos = [this.posX, this.posY]
        return this
    }

    copy() {
        return new Point(this.x, this.y, this.attrs, this.props)
    }
}

class Coordinate {
    constructor(opts) {
        let {origin, unitX, unitY} = opts

        this.unitX = unitX
        this.unitY = unitY
        this._origin = origin

        this.points = []

        this.origin = new Point(0, 0, {}, {
            origin,
            unitX,
            unitY
        })
    }

    point(x, y, attrs) {
        let {_origin, unitX, unitY} = this

        return new Point(x, y, attrs, {
            origin: _origin,
            unitX,
            unitY
        })
    }

    pos(x, y) {
        return this.point(x, y).pos
    }

    fromPos(left, top, attrs) {
        let {_origin, unitX, unitY} = this

        return this.point((left - _origin[0]) / unitX, (_origin[1] - top) / unitY, attrs)
    }

    add(x, y, attr) {
        let point = this.point(x, y, attr)
        this.points.push(point)

        return point
    }

    remove(point) {
        let idx = this.points.indexOf(point)
        if (idx > -1) {
            return this.points.splice(idx, 1) && true
        }
        return false
    }

    clear() {
        this.points = []
    }
}

export default Coordinate
