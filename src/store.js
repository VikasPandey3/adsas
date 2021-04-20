import {createStore} from 'redux'
import {MyappDetailErducer} from "./redux/reducer"

export const store = createStore(MyappDetailErducer);