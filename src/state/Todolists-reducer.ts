import { v1 } from 'uuid'
import { todoListsAPI, TodoListType } from '../api/todoLists-api'
import { Dispatch } from 'redux'

export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTotodlistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todoListId: string
}
export type ChangeTotodlistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	id: string
}
export type ChangeTotodlistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValueType
}
export type SetTodoListActionType = {
	type: 'SET-TODOLIST'
	todoList: Array<TodoListType>
}
export type FilterValueType = 'all' | 'completed' | 'active'

export type TodoListDomainType = TodoListType & {
	filter: FilterValueType
}

type ActionTypes =
	| RemoveTodoListActionType
	| AddTotodlistActionType
	| ChangeTotodlistFilterActionType
	| ChangeTotodlistTitleActionType
	| SetTodoListActionType

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (
	state: Array<TodoListDomainType> = initialState,
	action: ActionTypes
): Array<TodoListDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id != action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				{
					id: action.todoListId,
					title: action.title,
					filter: 'all',
					addedData: '',
					order: 0,
				},
				...state,
			]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			let todoList = state.find(t => t.id === action.id)
			if (todoList) {
				todoList.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			let todoList = state.find(t => t.id === action.id)
			if (todoList) {
				todoList.filter = action.filter
			}
			return [...state]
		}
		case 'SET-TODOLIST': {
			return action.todoList.map(tl => {
				return {
					...tl,
					filter: 'all',
				}
			})
		}
		default:
			return state
	}
}
export const removeTodoListAC = (
	todoListId: string
): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListId }
}

export const addTodoListAC = (title: string): AddTotodlistActionType => {
	return { type: 'ADD-TODOLIST', title, todoListId: v1() }
}

export const changeTodoListTitleAC = (
	id: string,
	title: string
): ChangeTotodlistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodoListFilterAC = (
	id: string,
	filter: FilterValueType
): ChangeTotodlistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
export const setTodoListAC = (
	todoList: Array<TodoListType>
): SetTodoListActionType => {
	return { type: 'SET-TODOLIST', todoList: todoList }
}
export const fetchTodoListsTC = () => {
	return (dispatch: Dispatch) => {
		todoListsAPI.getTodoLists().then(res => {
			dispatch(setTodoListAC(res.data))
		})
	}
}
