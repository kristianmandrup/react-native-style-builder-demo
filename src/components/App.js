/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component, PropTypes } from 'react-native'
import MyComponent from './MyComponent'

const {
  Text,
  View,
} = React

const App = ({styles = {}}) => {
  console.log('styles', styles)
  return (
    <View style={styles.container}>
      <MyComponent />
      <Text style={styles.title}>
        Welcome to React Native!
      </Text>
    </View>
  )
}

App.propTypes = {
  instructions: PropTypes.string,
}

App.defaultProps = {
  ...Component.defaultProps,
  instructions: 'Usage instructions not provided.',
}

export default App
