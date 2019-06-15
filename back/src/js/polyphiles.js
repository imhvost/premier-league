import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'

;(function () {
  // helpers
  var regExp = function (name) {
    return new RegExp('(^| )' + name + '( |$)')
  }
  var forEach = function (list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i])
    }
  }

  // class list object with basic methods
  function ClassList (element) {
    this.element = element
  }

  ClassList.prototype = {
    add: function () {
      forEach(arguments, function (name) {
        if (!this.contains(name)) {
          this.element.className += ' ' + name
        }
      }, this)
    },
    remove: function () {
      forEach(arguments, function (name) {
        this.element.className =
                  this.element.className.replace(regExp(name), '')
      }, this)
    },
    toggle: function (name) {
      return this.contains(name)
        ? (this.remove(name), false) : (this.add(name), true)
    },
    contains: function (name) {
      return regExp(name).test(this.element.className)
    }
  }

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function () {
        return new ClassList(this)
      }
    })
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace
  }
})()

;(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector
  ELEMENT.closest = ELEMENT.closest || function closest (selector) {
    if (!this) return null
    if (this.matches(selector)) return this
    if (!this.parentElement) { return null } else return this.parentElement.closest(selector)
  }
}(Element.prototype))
