import {
  StyleSheet,
} from 'react-native'

export default class StyleBuilder {
  constructor(props, state, styles) {
    this.props = props
    this.state = state
    this.styles = styles
    this.styleResult = styles.static
    this.dependencyMap = new Map()
    this.typeMap = {
      any: [],
      props: [],
      state: [],
    }
    this.createGeneric()
  }

  // We have two different dependency maps
  // one keyed per type, one per name
  // ie. to allow styleObj.state
  registerDependencies(name, propertyNames) {
    this.dependencyMap.set(name, propertyNames)

    if (propertyNames.length == 2) {
      return this.typeMap.any.add(name) // list
    }

    for (let prop of propertyNames) {
      this.typeMap[prop].add(name) // list
    }
  }

  browser() {
    return this.compute()
  }

  native() {
    return StyleSheet.create(this.compute())
  }

  compute() {
    this.computeStyles()
    if (this.stateDiff()) {
      this.oldState = this.state
    }
  }

  stateDiff() {
    return this.oldState !== this.state
  }

  computeStyles() {
    // ignore static styles
    // ie. styleObj.static

    // https://esdiscuss.org/topic/es6-iteration-over-object-values
    // https://www.pandastrike.com/posts/20150717-iterators

    if (this.bothDiff()) {
      for (let key of this.typeMap.any) {
        let styleFun = this.styles[key]
        // check state/props dependency and only call if either one changed
        this.styleResult[key] = styleFun({state: this.state, props: this.props})
      }
    }

    // for this to work, each entry should be a Map, not just an Object!
    // should compare pointer of prev state (assume immutable)
    if (this.stateDiff()) {
      for (let key of this.typeMap.state) {
        let styleFun = this.styles[key]
        // check state/props dependency and only call if either one changed
        this.styleResult[key] = styleFun(this.state)
      }
    }

    if (this.propsDiff()) {
      // should compare pointer of prev props (assume immutable)
      for (let key of this.typeMap.props) {
        let styleFun = this.styles[key]
        // check state/props dependency and only call if either one changed
        this.styleResult[key] = styleFun(this.props)
      }
    }
    return this.styleResult
  }

  createGeneric() {
    this.genericStyles = () => {
      return (this.generic || []).reduce((prev, style) => {
        prev[style] = (x) => { return this[style](x) }
      })
    }
  }
}
