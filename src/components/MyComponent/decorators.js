// @computeOn('state')
// title: ({state}) => {
export function computeOn(propertyNames, target, name, descriptor) {
  target.registerDependencies(name, propertyNames)
  return descriptor
}

// @updateStyles
export function updateStyles(propertyNames, target, name, descriptor) {
  let oldHandler = target

  function updateStyler(nextProps, nextState) {
    this.updateStyles(nextProps, nextState)
    oldHandler.apply(this, arguments)
  }

  if (typeof target === 'function') {
    return updateStyler
  }

  oldHandler = descriptor.value
  descriptor.value = updateStyler

  return descriptor
}

// @statefulStyles('native')
export function statefulStyling(type, clazz) {
  return function(target) {
    // add function updateStyles to target (class ie. prototype)
    target.updateStyles = function(nextProps, nextState) {
      this.state.styles = clazz.create(nextProps, nextState)[type]()
    }.bind(target)

    return target
  }
}
