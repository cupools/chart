'use strict'

import 'hidpi-canvas/dist/hidpi-canvas'
import './utils/polyfill.js'
import Pie from './type/Pie'
import Line from './type/Line'

export { Pie, Line }

if (module.hot) {
    module.hot.accept()
}
