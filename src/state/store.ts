import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	createStore,
	legacy_createStore,
} from 'redux'
import { tasksReducer } from './Task-reducer'
import { todoListsReducer } from './Todolists-reducer'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
	todoLists: todoListsReducer,
	tasks: tasksReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
//@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
window.store = store

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
