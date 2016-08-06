/*!
 * chart.js -- v0.0.1 -- 2016-08-06
 * https://github.com/cupools/chart
 * 
 * Licensed under the MIT license
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("chart",[],e):"object"==typeof exports?exports.chart=e():t.chart=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Line=e.Pie=void 0,n(2),n(3);var o=n(4),r=i(o),a=n(7),s=i(a);e.Pie=r["default"],e.Line=s["default"]},function(t,e){!function(t){var e=function(t){var e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e}(t),n=function(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)},i={fillRect:"all",clearRect:"all",strokeRect:"all",moveTo:"all",lineTo:"all",arc:[0,1,2],arcTo:"all",bezierCurveTo:"all",isPointinPath:"all",isPointinStroke:"all",quadraticCurveTo:"all",rect:"all",translate:"all",createRadialGradient:"all",createLinearGradient:"all"};1!==e&&(n(i,function(n,i){t[i]=function(t){return function(){var i,o,r=Array.prototype.slice.call(arguments);if("all"===n)r=r.map(function(t){return t*e});else if(Array.isArray(n))for(i=0,o=n.length;i<o;i++)r[n[i]]*=e;return t.apply(this,r)}}(t[i])}),t.stroke=function(t){return function(){this.lineWidth*=e,t.apply(this,arguments),this.lineWidth/=e}}(t.stroke),t.fillText=function(t){return function(){var n=Array.prototype.slice.call(arguments);n[1]*=e,n[2]*=e,this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(t,n,i){return n*e+i}),t.apply(this,n),this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(t,n,i){return n/e+i})}}(t.fillText),t.strokeText=function(t){return function(){var n=Array.prototype.slice.call(arguments);n[1]*=e,n[2]*=e,this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(t,n,i){return n*e+i}),t.apply(this,n),this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(t,n,i){return n/e+i})}}(t.strokeText))}(CanvasRenderingContext2D.prototype),function(t){t.getContext=function(t){return function(e){var n,i,o=t.call(this,e);return"2d"===e&&(n=o.backingStorePixelRatio||o.webkitBackingStorePixelRatio||o.mozBackingStorePixelRatio||o.msBackingStorePixelRatio||o.oBackingStorePixelRatio||o.backingStorePixelRatio||1,i=(window.devicePixelRatio||1)/n,i>1&&(this.style.height=this.height+"px",this.style.width=this.width+"px",this.width*=i,this.height*=i)),o}}(t.getContext)}(HTMLCanvasElement.prototype)},function(t,e){"use strict";"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");t=Object(t);for(var e=1;e<arguments.length;e++){var n=arguments[e];if(null!=n)for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t})},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),a=i(r),s=n(6),u=i(s),l=Math.PI,c=[l/4*7,l/4,l/4*3,l/4*5],f={renderData:[],radius:100,textRadius:0,outRadius:0,position:[160,160]};e["default"]={render:function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=Object.assign({},f,e),i=n.renderData,r=n.radius,s=n.textRadius,h=n.outRadius,p=n.position,d=i.reduce(function(t,e){return(null!=t.count?t.count:t)+e.count}),v=i.length,y=0-l/2;i.map(function(t){var e=t.count,n=y,o=e/d*l*2+n;isNaN(o)&&(o=n+2*l/i.length);var u=(o-n+l)/2+y;return y=o,a["default"].assignWith(t,{radius:r,textRadius:s,outRadius:h,startAngle:n,endAngle:o,middleAngle:u})}),i.map(function(e,n){var i=e.count,r=e.radius,a=e.texture,s=e.outRadius,l=e.startAngle,c=e.endAngle,f=e.middleAngle;s=2===v&&d&&d/i!==2?s:0;var h=new u["default"](p,s).pos(f);t.save(),t.beginPath(),t.fillStyle=a,t.strokeStyle=a,t.moveTo.apply(t,o(h)),t.arc.apply(t,o(h).concat([r,l,c,!1])),t.fill(),t.stroke(),t.closePath(),t.restore()}),i.map(function(e,n){var r=e.count,a=e.radius,s=e.outRadius,f=e.textRadius,h=e.middleAngle;if(d&&0===r||!f)return!1;var y=r+"枚";if(v<3){var g=new u["default"](p,Math.floor((a+s)/4*3)).pos(h),m=c[Math.floor(h/l*2)],x=!!n||0===i[1].count&&0!==r;t.save(),t.fillStyle="#333",t.strokeStyle="#333",t.beginPath(),t.moveTo.apply(t,o(g)),t.arc.apply(t,o(g).concat([2,0,2*l,!1])),t.fillStyle="#333",t.fill(),t.closePath(),t.beginPath(),t.moveTo.apply(t,o(g)),g=new u["default"](g,a-f).pos(m-l/2),t.lineTo.apply(t,o(g)),g[0]=g[0]+(x?-15:15),t.lineTo.apply(t,o(g)),t.stroke(),t.closePath(),t.beginPath(),g[0]=g[0]+(x?-4:4),g[1]=g[1]+5,t.moveTo.apply(t,o(g)),t.font="10px Arial",t.textAlign=x?"right":"left",t.fillStyle="#333",t.fillText.apply(t,[y].concat(o(g))),t.restore()}else{var k=new u["default"](p,Math.floor((a+s)/4*3)).pos(h),b=h>l;t.save(),t.fillStyle="#333",t.strokeStyle="#333",t.beginPath(),t.moveTo.apply(t,o(k)),t.arc.apply(t,o(k).concat([2,0,2*l,!1])),t.fillStyle="#333",t.fill(),t.closePath(),t.beginPath(),t.moveTo.apply(t,o(k)),k=new u["default"](p,f+s).pos(h),t.lineTo.apply(t,o(k)),k[0]=k[0]+(b?-15:15),t.lineTo.apply(t,o(k)),t.stroke(),t.closePath(),k[0]=k[0]+(b?-6:6),k[1]=k[1]+5,t.moveTo.apply(t,o(k)),t.font="10px Arial",t.textAlign=b?"right":"left",t.fillStyle="#333",t.fillText.apply(t,[y].concat(o(k))),t.restore()}})}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={assignWith:function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");t=Object(t);for(var e=1;e<arguments.length;e++){var n=arguments[e];if(null!=n)for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&!t[i]&&(t[i]=n[i])}return t},max:Math.max,min:Math.min}},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(u){o=!0,r=u}finally{try{!i&&s["return"]&&s["return"]()}finally{if(o)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=Math.sin,a=Math.cos,s=function(){function t(e,o){n(this,t);var r=i(e,2),a=r[0],s=r[1];Object.assign(this,{origin:e,radius:o,posX:a,posY:s})}return o(t,[{key:"pos",value:function(t){var e=this.posX+r(t)*this.radius,n=this.posY-a(t)*this.radius;return[e,n]}}]),t}();e["default"]=s},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t){return Array.isArray(t)?t:Array.from(t)}function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=n(5),l=i(u),c=n(8),f=i(c),h=n(9),p=i(h),d={renderData:[{count:1,name:1},{count:2,name:2},{count:3,name:3},{count:4,name:4},{count:5,name:5},{count:6,name:6},{count:7,name:7}],width:300,height:250,position:[0,0],padding:40,minUnitWidth:40},v=function(){function t(e,n){a(this,t);var i=Object.assign({},d,n),o=i.renderData,s=i.position,u=i.width,c=i.height,h=i.padding,p=i.minUnitWidth,v=[s[0]+h,s[1]+c-h];this.ctx=e,this.options=i,this.position=s,this.graph={origin:v,width:u-h,height:c-h},this.ctl={offsetX:0,offsetLeft:0,limitPos:[],limitIndex:[1,Math.floor((u-h)/p)],sum:o.reduce(function(t,e){return(t.count?t.count:t)+e.count}),maxUnitCount:{x:l["default"].min(Math.ceil((u-h)/p),o.length),y:l["default"].max.apply(l["default"],r(o.map(function(t){return t.count})))+1}};var y=this.getUnitX(),g=this.getUnitY();this.coor=new f["default"]({origin:v,unitX:y,unitY:g})}return s(t,[{key:"initialData",value:function(){var t=this,e=this.options,n=e.renderData,i=e.position,o=this.ctl,r=o.limitIndex,a=o.offsetLeft,s=this.getUnitX(),u=n.map(function(t){return Object.assign({},t)}),l=r.map(function(e,n){return t.coor.pos(e,0)[0]+s/2*(n?1:-1)+a+i[0]}),c=Math.round(this.ctl.offsetLeft/s);this.ctl.limitPos=l,this.ctl.offsetX=c,this.coor.clear(),u.map(function(e,n){var i=e.name,o=e.count,r=n+1,a=e.count,c=0,f=t.coor.add(r,a,{index:n,count:o,name:i,overflow:c,cross:null});if(f.posX<l[0]?f.attrs.overflow=-Math.ceil((l[0]-f.posX)/s):f.posX>l[1]&&(f.attrs.overflow=Math.ceil((f.posX-l[1])/s)),f.attrs.overflow===-1&&u[n+1]){var h=t.coor.point(n+2,u[n+1].count),p=l[0],d=(h.posY-f.posY)/(h.posX-f.posX),v=isFinite(d)?f.posY+d*(p-f.posX):f.posY;f.attrs.cross=t.coor.fromPos(p,v)}else if(1===f.attrs.overflow&&u[n-1]){var y=t.coor.point(n,u[n-1].count),g=l[1],m=(y.posY-f.posY)/(y.posX-f.posX),x=isFinite(m)?f.posY+m*(g-f.posX):f.posY;f.attrs.cross=t.coor.fromPos(g,x)}})}},{key:"render",value:function(){this.initialData(),this.renderAxies(),this.renderComment(),this.ctx.save(),this.ctx.translate(-this.ctl.offsetLeft,0),this.renderRegion(),this.renderPoints(),this.ctx.restore()}},{key:"renderAxies",value:function(){for(var t=this.ctl.maxUnitCount.x,e=this.ctl.maxUnitCount.y,n=this.graph,i=n.origin,r=n.width,a=this.coor,s=t+1,u=e+1,l=3;u--;){var c=a.pos(u?0:1,u),f=[i[0]+r,c[1]];this.line(c,f,{color:"#999"})}for(var h=a.point(0,0),p=[6,-4];l--;){var d=o(h.pos),v=d,y=o(h.offset.apply(h,p).pos),g=y;this.line(v,g,{color:"#999"});var m=o(h.offset(0,-p[1]).pos),x=m;this.line(g,x,{color:"#999"}),l||(g=h.setX(1).pos,this.line(x,g,{color:"#999"}))}for(;s--;){var k=a.pos(s,0),b=a.pos(s,0);b[1]=b[1]-5,this.line(k,b,{color:"#666"})}}},{key:"renderComment",value:function(){var t=this.options.padding,e=this.ctl,n=e.offsetX,i=e.limitIndex,o=this.ctl.maxUnitCount.y,r=this.ctl.maxUnitCount.x,a=this.coor,s=a.points,u=l["default"].min(r,i[1])-1,c=o,f=null;for(f=a.point(i[1],0).offset(0,t/4*3).pos,this.text("8月/日",f,{textAlign:"center"}),f=a.point(0,c).offset(-t/4*3,0).pos,this.text("枚/",f);u>-1;){if(s[u+n]){var h=s[u+n].attrs;f=a.point(u+1,0).offset(0,t/3).pos,this.text(h.name,f)}0===u&&(f=a.point(0,0).offset(0,t/3).pos,this.text(0,f)),u--}for(;c>-1;)f=a.point(0,c).offset(-t/3,0).pos,this.text(c,f),c--}},{key:"renderRegion",value:function(){var t=this.coor,e=t.points,n=!0,i=!0,o=e.filter(function(t){var e=t.attrs,o=e.overflow,r=e.cross;return r&&(o<0?n=!1:o>0&&(i=!1)),0===o||r}).map(function(t){return t.attrs.cross||t});if(o.length>1){var r=o[0].copy().setY(0),a=o[o.length-1].copy().setY(0);o.push(a,r),this.polygons(o.map(function(t){return t.pos}),{fillStyle:"rgba(127,170,126,.3)",strokeStyle:"rgb(127,170,126)",strokeLeft:n,strokeRight:i})}}},{key:"renderPoints",value:function(){var t=this,e=this.coor.points,n=e.length,i=this.ctx;e.map(function(o){var a=o.attrs,s=a.count,u=a.index,l=a.overflow;if(!l){var c=o.pos;i.save(),i.beginPath(),i.moveTo.apply(i,r(c)),i.arc.apply(i,r(c).concat([3,0,2*Math.PI])),i.closePath(),i.fillStyle="#6cab6b",i.fill(),i.restore();var f=-12;u>0&&u<n-1&&s<e[u-1].attrs.count&&s>1&&(f=13),c=o.copy().offset(0,f).pos,t.text(s,c,{fillStyle:"#71b070"})}})}},{key:"text",value:function(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],i=n.fillStyle,o=void 0===i?"#999":i,r=n.textAlign,a=void 0===r?"center":r,s=this.ctx,u=e[0],l=e[1]+5;s.save(),s.textAlign=a,s.font="10px Arial",s.fillStyle=o,s.fillText(t,u,l),s.restore()}},{key:"line",value:function(t,e,n){var i=n.color,o=n.width,a=void 0===o?1:o,s=this.ctx;s.save(),s.beginPath(),s.moveTo.apply(s,r(t)),s.lineWidth=a,s.lineTo.apply(s,r(e)),s.strokeStyle=i,s.stroke(),s.restore()}},{key:"polygons",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=e.fillStyle,i=e.strokeStyle,o=e.strokeLeft,a=e.strokeRight,s=this.ctx;s.save(),s.beginPath();var u=t.shift();s.moveTo.apply(s,r(u));for(var l=t.length;l-- >2;)s.lineTo.apply(s,r(t.shift()));s.strokeStyle=i,s.stroke();var c=t.shift(),f=t.shift();s.lineTo.apply(s,r(c)),a&&s.stroke(),s.lineTo.apply(s,r(f)),s.lineTo.apply(s,r(u)),s.fillStyle=n,s.fill(),s.closePath(),o&&(s.beginPath(),s.moveTo.apply(s,r(u)),s.lineTo.apply(s,r(f)),s.stroke(),s.closePath()),s.restore()}},{key:"getUnitX",value:function(){var t=this.options.minUnitWidth;return t}},{key:"getUnitY",value:function(){return(this.graph.height-5)/this.ctl.maxUnitCount.y}},{key:"getOffsetLeft",value:function(){return this.ctl.offsetLeft}},{key:"setOffsetLeft",value:function(t){var e=this.coor.unitX,n=this.ctl.limitIndex,i=1-e/2,o=e*(this.options.renderData.length-n[1]+n[0])-e/2-1;o=l["default"].max(o,e/2-1),t=l["default"].max(i,l["default"].min(o,t)),this.ctl.offsetLeft=t}},{key:"swipeTo",value:function(t){var e=this,n=this.coor.unitX,i=n*t;(0,p["default"])(this.ctl).to({offsetLeft:i},600,"easeOutQuart").change(function(){e.clear(),e.render()}).run()}},{key:"clear",value:function(){var t,e=this.options,n=e.position,i=e.width,o=e.height,a=e.padding;(t=this.ctx).clearRect.apply(t,r(n).concat([i+a,o+a]))}}]),t}();e["default"]={init:function(t,e){return new v(t,e)},render:function(t,e){var n=new v(t,e);return n.render()}}},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=0,r=function(){function t(e,i){var r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],a=arguments[3];n(this,t),this.x=e,this.y=i,this.attrs=r,this.props=a,this.id=o++,this.pos=[],this.posX=0,this.posY=0,this.calculate()}return i(t,[{key:"calculate",value:function(){var t=this.x,e=this.y,n=this.props,i=n.origin,o=n.unitX,r=n.unitY;this.posX=i[0]+o*t,this.posY=i[1]-r*e,this.pos=[this.posX,this.posY]}},{key:"setX",value:function(t){return this.x=t,this.calculate(),this}},{key:"setY",value:function(t){return this.y=t,this.calculate(),this}},{key:"offset",value:function(t,e){var n=this.props,i=n.origin,o=n.unitX,r=n.unitY;return this.posX+=t,this.posY+=e,this.x=(this.posX-i[0])/o,this.y=(i[1]-this.posY)/r,this.pos=[this.posX,this.posY],this}},{key:"copy",value:function(){return new t(this.x,this.y,this.attrs,this.props)}}]),t}(),a=function(){function t(e){n(this,t);var i=e.origin,o=e.unitX,a=e.unitY;this.unitX=o,this.unitY=a,this._origin=i,this.points=[],this.origin=new r(0,0,{},{origin:i,unitX:o,unitY:a})}return i(t,[{key:"point",value:function(t,e,n){var i=this._origin,o=this.unitX,a=this.unitY;return new r(t,e,n,{origin:i,unitX:o,unitY:a})}},{key:"pos",value:function(t,e){return this.point(t,e).pos}},{key:"fromPos",value:function(t,e,n){var i=this._origin,o=this.unitX,r=this.unitY;return this.point((t-i[0])/o,(i[1]-e)/r,n)}},{key:"add",value:function(t,e,n){var i=this.point(t,e,n);return this.points.push(i),i}},{key:"remove",value:function(t){var e=this.points.indexOf(t);return e>-1&&(this.points.splice(e,1)&&!0)}},{key:"clear",value:function(){this.points=[]}}]),t}();e["default"]=a},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(){f=f.filter(function(t){var e=t.shift()();return!(e&&e.done)}),c(r)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e["default"]=function(t){return new h(t)};var s=n(10),u=i(s),l=30,c=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/l)}}(),f=[];r();var h=function(){function t(e){o(this,t),this.stack=[],this.callback=null,this.running=!1,this.done=!1,this.target=e,this._origin={},Object.assign(this._origin,e)}return a(t,[{key:"to",value:function(t,e){var n=this,i=arguments.length<=2||void 0===arguments[2]?u["default"].linear:arguments[2],o=void 0,r=this.stack;i.length?o=u["default"][i]||u["default"].linear:"function"==typeof i&&(o=i);for(var a=Math.ceil(e/l),s=this._origin,c=function(e){var i={};for(var u in t)if(t.hasOwnProperty(u)){var l=t[u]-s[u],c=e/a;i[u]=s[u]+l*o(c)}r.push(function(){Object.assign(n.target,i),n.callback&&n.callback(i)})},f=0;f<=a;f++)c(f);return r.push(function(){return Object.assign(n.target,t),n.callback&&n.callback(t),n.running=!1,n.done=!0,{done:!0}}),this}},{key:"run",value:function(){f.push(this.stack)}},{key:"stop",value:function(){this.stack.splice(0,this.stack.length-1)}},{key:"change",value:function(t){return"function"==typeof t&&(this.callback=t),this}}]),t}()},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t}}}])});