import { v1 } from 'uuid'
import { FilterValueType, ToDoListType } from '../AppWithRedux'
import { title } from 'process'

type ActionType = {
	type: string
	[key: string]: any
}

export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTotodlistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todoListID: string
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

type ActionTypes =
	| RemoveTodoListActionType
	| AddTotodlistActionType
	| ChangeTotodlistFilterActionType
	| ChangeTotodlistTitleActionType

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<ToDoListType> = []

export const todoListsReducer = (
	state: Array<ToDoListType> = initialState,
	action: ActionTypes
): Array<ToDoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id != action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				{
					id: action.todoListID,
					title: action.title,
					filter: 'all',
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

		default:
			return state
	}
}
export const removeTodoListAC = (
	todoListID: string
): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListID }
}

export const addTodoListAC = (title: string): AddTotodlistActionType => {
	return { type: 'ADD-TODOLIST', title, todoListID: v1() }
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
