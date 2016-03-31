import { Styles } from './styles.js'
import { statefulStyling, updateStyles } from './styles.js'
import { injectProps } from 'relpers'
import React, {
  Component,
  View,
} from 'react-native'

// props are global (or higher level state)
// state is local state (ie. local styling)
// to calculate local style state, use global and local state
// to compute new style object (one level deep only!)

// See ES7 Decorators + React
// https://medium.com/@goncalvesjoao/react-es7-decorators-how-to-inject-props-to-your-render-method-27a0a7973106#.d9dir76zc
@statefulStyling(Styles, 'native')
export default class MyComponent extends Component {

  // just before component is rendered after a state update,
  // we re-compute styles based on state
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
