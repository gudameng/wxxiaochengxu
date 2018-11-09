import { createStore } from '../libs/redux.min.js'
//这里调用的可以是随便什么名字，不一定非得是rootReducer
import allReducer from './reducers/index.js'

export default createStore(allReducer)