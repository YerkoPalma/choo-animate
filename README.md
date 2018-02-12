# choo-animate

add handi animations to choo native events

## Usage

Use it mainly through data attributes. 

- `data-before-transition="fadeOut|moveLeft|"`
- `data-after-transition="fadeOut|moveLeft|"`

Use your custom animations

```js
app.use(require('choo-animate')({ animation: fancyAnimation }))
```

```js
html`<div data-animate="onrender" data-animation-enter="fancyAnimation"></div>`
```
