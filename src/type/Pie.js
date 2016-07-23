'use strict'

import _ from '../utils/util'
import Circle from './Circle'

const PI = Math.PI
const outAngleMap = [PI / 4 * 7, PI / 4, PI / 4 * 3, PI / 4 * 5]

const defaultOptions = {
    renderDate: [],
    radius: 100,
    textRadius: 0,
    outRadius: 0,
    position: [160, 160]
}

export default {
    render(ctx, opt = {}) {
        let options = Object.assign({}, defaultOptions, opt)
        let {renderDate, radius, textRadius, outRadius, position} = options
        let sum = renderDate.reduce((a, b) => ((a.count ? a.count : a) + b.count))
        let len = renderDate.length
        let last = 0 - PI / 2

        renderDate.map(item => {
            let {count} = item
            let startAngle = last
            let endAngle = count / sum * PI * 2 + startAngle
            let middleAngle = (endAngle - startAngle + PI) / 2 + last

            last = endAngle

            return _.assignWith(item, {
                radius,
                textRadius,
                outRadius,
                startAngle,
                endAngle,
                middleAngle
            })
        })

        // 绘制主要的扇形区域
        renderDate.map((item, idx) => {
            let {count, radius, texture, outRadius, startAngle, endAngle, middleAngle} = item

            if (count === 0) {
                return false
            }

            let pos = new Circle(position, outRadius).pos(middleAngle)
            outRadius = (len === 2 && sum / count !== 2) ? outRadius : 0

            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = texture
            ctx.strokeStyle = texture

            ctx.moveTo(...pos)
            ctx.arc(...pos, radius, startAngle, endAngle, false)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        })

        // 绘制注解
        renderDate.map((item, idx) => {
            let {count, radius, outRadius, textRadius, middleAngle} = item

            if (count === 0 || !textRadius) {
                return false
            }

            let txt = count + '枚'

            if (len < 3) {
                // 绘制起始点
                let pos = new Circle(position, Math.floor((radius + outRadius) / 4 * 3)).pos(middleAngle)
                let outAngle = outAngleMap[Math.floor(middleAngle / PI * 2)]

                ctx.save()
                ctx.fillStyle = '#333'
                ctx.strokeStyle = '#333'

                ctx.beginPath()
                ctx.moveTo(...pos)
                ctx.arc(...pos, 2, 0, PI * 2, false)
                ctx.fillStyle = '#333'
                ctx.fill()
                ctx.closePath()

                // 绘制折线
                ctx.beginPath()
                ctx.moveTo(...pos)

                pos = new Circle(pos, radius - textRadius).pos(outAngle - PI / 2)

                ctx.lineTo(...pos)
                pos[0] = pos[0] + (idx ? -15 : 15)
                ctx.lineTo(...pos)
                ctx.stroke()
                ctx.closePath()

                // 绘制注解
                ctx.beginPath()
                pos[0] = pos[0] + (idx ? -4 : 4)
                pos[1] = pos[1] + 5
                ctx.moveTo(...pos)
                ctx.font = '10px Arial'
                ctx.textAlign = idx ? 'right' : 'left'
                ctx.fillStyle = '#333'
                ctx.fillText(txt, ...pos)

                ctx.restore()
            } else {
                let pos = new Circle(position, Math.floor((radius + outRadius) / 4 * 3)).pos(middleAngle)
                let isRight = middleAngle > PI
                ctx.save()
                ctx.fillStyle = '#333'
                ctx.strokeStyle = '#333'

                // 绘制起始点
                ctx.beginPath()
                ctx.moveTo(...pos)
                ctx.arc(...pos, 2, 0, PI * 2, false)
                ctx.fillStyle = '#333'
                ctx.fill()
                ctx.closePath()

                // 绘制折线
                ctx.beginPath()
                ctx.moveTo(...pos)
                pos = new Circle(position, textRadius + outRadius).pos(middleAngle)
                ctx.lineTo(...pos)
                pos[0] = pos[0] + (isRight ? -15 : 15)
                ctx.lineTo(...pos)
                ctx.stroke()
                ctx.closePath()

                // 绘制注解
                pos[0] = pos[0] + (isRight ? -6 : 6)
                pos[1] = pos[1] + 5
                ctx.moveTo(...pos)
                ctx.font = '10px Arial'
                ctx.textAlign = isRight ? 'right' : 'left'

                ctx.fillStyle = '#333'
                ctx.fillText(txt, ...pos)
                ctx.restore()
            }
        })
    }
}
