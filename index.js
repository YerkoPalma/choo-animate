function animate (opts) {
  opts = opts || {}
  var _animations = opts.animations
  var _elements = opts.elements || [document.body]

  return function (state, emitter, app) {
    emitter.on(state.events.DOMCONTENTLOADED, function () {
      // assign events on data components
      var $$ = document.querySelectorAll.bind(document)
      var beforeElements = $$('data-before-transition')
      var afterElements = $$('data-after-transition')

      emitter.prependListener(state.events.NAVIGATE, function () {
        var elements = beforeElements.length > 0 ? beforeElements : _elements
        emitter.emit('before-transition', elements, _animations)
      })

      emitter.on(state.events.NAVIGATE, function () {
        var elements = afterElements.length > 0 ? afterElements : _elements
        emitter.emit('after-transition', elements, _animations)
      })

      emitter.prependListener('before-transition', function (elements, transitions) {
        if (elements.length > 0) {
          Array.prototype.forEach.call(elements, function (element) {
            var _before = element.dataset['before-transition'] || opts.before
            var trans = _before ? transitions[_before] : noop
            trans(element).play()
          })
        }
      })

      emitter.prependListener('after-transition', function (elements, transitions) {
        if (elements.length > 0) {
          Array.prototype.forEach.call(elements, function (element) {
            var _after = element.dataset['after-transition'] || opts.after
            var trans = _after ? transitions[_after] : noop
            trans(element).play()
          })
        }
      })
    })
  }
}

function noop () {}
module.exports = animate
