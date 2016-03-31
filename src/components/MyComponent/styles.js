// import {headers} from '../../styles/Global.styles.js'
// TODO: extract to npm module
import { StyleBuilder } from '../StyleBuilder.js'
import { computeOn } from './decorators'

// https://github.com/goncalvesjoao/relpers

// we define and export the styles object separately for max flexibility
// @applyMixin(headers)
export const styles = {
    // return style object
    // State dependency decorator, will decorate as factory
    // which registers style function as state dependent
  @computeOn('state')
  title: (state) => {
    return {
      color: state.todo.completed ? 'red' : 'green',
    }
  },
    // header: headers.subHeader(),
    // title: headers.bigTitle(),

// TODO: use mixin decorator
}

export const create = (props, state) => {
  return new StyleBuilder(props, state, styles)
}
