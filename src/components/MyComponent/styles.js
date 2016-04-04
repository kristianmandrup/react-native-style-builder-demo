import { StyleBuilder } from 'reactive-style-builder'
import { StyleSheet } from 'react-native'

export const styles = {
  title: (state) => {
    return {
      color: state.todo.completed ? 'red' : 'green',
    }
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
