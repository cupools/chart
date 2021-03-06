'use strict'

import Circle from './Circle'

const PI = Math.PI
const outAngleMap = [PI / 4 * 7, PI / 4, PI / 4 * 3, PI / 4 * 5]

const defaultOptions = {
    renderData: [],
    radius: 100,
    textRadius: 0,
    outRadius: 0,
    position: [160, 160]
}

export default {
    render(ctx, opt = {}) {
        let options = Object.assign({}, defaultOptions, opt)
        let {renderData, radius, textRadius, outRadius, position} = options
        let sum = renderData.reduce((a, b) => ((a.count != null ? a.count : a) + b.count))
        let len = renderData.length
        let last = 0 - PI / 2

        renderData.map(item => {
            let {count} = item
            let startAngle = last

            let endAngle = count / sum * PI * 2 + startAngle
            // Fix empty data
            if (isNaN(endAngle)) {
                endAngle = startAngle + PI * 2 / renderData.length
            }
            let middleAngle = (endAngle - startAngle + PI) / 2 + last

            last = endAngle

            return Object.assign({}, {
                radius,
                textRadius,
                outRadius,
                startAngle,
                endAngle,
                middleAngle
            }, item)
        })

        // 绘制主要的扇形区域
        renderData.map((item, idx) => {
            let {count, radius, texture, outRadius, startAngle, endAngle, middleAngle} = item

            if (sum && count === 0) {
                return false
            }

            outRadius = (len === 2 && sum && sum / count !== 2) ? outRadius : 0

            let pos = new Circle(position, outRadius).pos(middleAngle)

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
        renderData.map((item, idx) => {
            let {count, radius, outRadius, textRadius, middleAngle} = item

            if ((sum && count === 0) || !textRadius) {
                return false
            }

            let txt = count + '枚'

            if (len < 3) {
                // 绘制起始点
                let pos = new Circle(position, Math.floor((radius + outRadius) / 4 * 3)).pos(middleAngle)
                let outAngle = outAngleMap[Math.floor(middleAngle / PI * 2)]
                let isLeft = !!idx || (renderData[1].count === 0 && count !== 0)

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
                pos[0] = pos[0] + (isLeft ? -15 : 15)
                ctx.lineTo(...pos)
                ctx.stroke()
                ctx.closePath()

                // 绘制注解
                ctx.beginPath()
                pos[0] = pos[0] + (isLeft ? -4 : 4)
                pos[1] = pos[1] + 5
                ctx.moveTo(...pos)
                ctx.font = '10px Arial'
                ctx.textAlign = isLeft ? 'right' : 'left'
                ctx.fillStyle = '#333'
                ctx.fillText(txt, ...pos)

                ctx.restore()
            } else {
                let pos = new Circle(position, Math.floor((radius + outRadius) / 4 * 3)).pos(middleAngle)
                let isLeft = middleAngle > PI
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
                pos[0] = pos[0] + (isLeft ? -15 : 15)
                ctx.lineTo(...pos)
                ctx.stroke()
                ctx.closePath()

                // 绘制注解
                pos[0] = pos[0] + (isLeft ? -6 : 6)
                pos[1] = pos[1] + 5
                ctx.moveTo(...pos)
                ctx.font = '10px Arial'
                ctx.textAlign = isLeft ? 'right' : 'left'

                ctx.fillStyle = '#333'
                ctx.fillText(txt, ...pos)
                ctx.restore()
            }
        })
    }
}
