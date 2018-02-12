var css = require('sheetify')
var choo = require('choo')

var { fadeIn, fadeOut } = require('animation-toolbox')

css('tachyons')

var app = choo()
app.use(require('.')({
  animations: {'fadein': fadeIn, 'fadeout': fadeOut},
  before: 'fadeout',
  after: 'fadein'
}))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
