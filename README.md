# choo-animate

add handi animations to choo native events

## Usage

There are many ways to use this module.

```js
var { fadeIn, fadeOut } = require('animation-toolbox')

var app = choo()
app.use(require('choo-animate')({
  animations: {'fadein': fadeIn, 'fadeout': fadeOut},
  before: 'fadeout',
  after: 'fadein'
}))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

app.mount('body')
```

Or through data tags

```js
var { fadeIn, fadeOut } = require('animation-toolbox')

var app = choo()
app.use(require('choo-animate')({
  animations: {'fadein': fadeIn, 'fadeout': fadeOut}
}))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

app.mount('body')

// in your view
module.exports = function view (state, emit) {
  return html`<body data-before-transition="fadeout" data-after-transition="fadein">
  </body>`
}
```

## API
### `var store = animate(opts)`

You can pass two options to the store function:

- `animations`: Required. An object where every property has a function as value, 
that get an element and return a Web Animation instance. This isn't quite accurate, 
because you could just return an object with a `play` function as a property, but 
is highly recommendable to use the web animation api, otherwise you should optimize
and check manually a lot of stuff.
- `elements`: Optional. An array like set of HTMLElements. animations will be 
applied to each of these elements. The store will first check for elements in your 
view with `data-{before|after}-transition` tags, if none is found, it will check 
if you provide this option, lastly, if not supplied, it would apply animations on
`document.body` element.
- `before`: Optional. A string with the name of the animation to be ran _before_
a page transition (`navigate` event in choo lifecycle). If you have data transitions
tags and also set this option, it will try to use the data tag, so you can use this 
to set different transitions on different elements.
- `after`: Optional. A string with the name of the animation to be ran _after_
a page transition (`navigate` event in choo lifecycle). If you have data transitions
tags and also set this option, it will try to use the data tag, so you can use this 
to set different transitions on different elements.

## See also

- [nanoanimation](https://github.com/choojs/nanoanimation)
- [animation-toolbox](https://github.com/YerkoPalma/animation-toolbox)

## LICENSE
MIT