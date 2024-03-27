import { combineReducers, createStore } from 'redux'
import { tasksReducer } from './Task-reducer'
import { todoListsReducer } from './Todolists-reducer'

const rootReducer = combineReducers({
	todoLists: todoListsReducer,
	tasks: tasksReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
//@ts-ignore
window.store = store
