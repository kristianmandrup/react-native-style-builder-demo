import { StyleBuilder } from 'reactive-style-builder'
import { StyleSheet } from 'react-native'

const styles = {
  title: (state) => {
    return {
      color: state.todo.completed ? 'red' : 'green',
    }
  },
  container: {
    color: 'blue',
  },
  header: {
    color: 'purple',
  },
}

function native(state, props) {
  return StyleSheet.create(this.default(state, props))
}

export default StyleBuilder.create(styles, {
  name: 'MyComponent',
  computers: {
    native,
  },
})
