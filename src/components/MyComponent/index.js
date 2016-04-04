import {
  statefulStyling,
  updateStyles,
} from 'reactive-style-builder'

import {
  injectProps,
} from 'relpers'

import React, {
  Component,
  View,
} from 'react-native'

import { Styles } from './styles.js'


// props are global (or higher level state)
// state is local state (ie. local styling)
// to calculate local style state, use global and local state
// to compute new style object (one level deep only!)

// See ES7 Decorators + React
// https://medium.com/@goncalvesjoao/react-es7-decorators-how-to-inject-props-to-your-render-method-27a0a7973106#.d9dir76zc
@statefulStyling('native', Styles)
export default class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  @updateStyles
  componentWillMount() {
  }

  @updateStyles
  componentWillUpdate() {
  }

  // https://github.com/goncalvesjoao/relpers
  @injectProps('state', 'props')
  render({ styles }) {
    return (
      <View styles={styles.header}>
        <View styles={styles.titles} />
      </View>
    )
  }
}
