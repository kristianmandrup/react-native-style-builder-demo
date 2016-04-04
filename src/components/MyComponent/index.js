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

import styleBuilder from './styles.js'

console.log('styleBuilder', styleBuilder);

@statefulStyling('native', styleBuilder)
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
        <View styles={styles.title} />
      </View>
    )
  }
}
