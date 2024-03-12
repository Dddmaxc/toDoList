import { v1 } from 'uuid'
import { FilterValueType, ToDoListType } from '../App'
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

export const todoListsReducer = (
	state: Array<ToDoListType>,
	action: ActionTypes
): Array<ToDoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id != action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				...state,
				{
					id: v1(),
					title: action.title,
					filter: 'all',
				},
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
			throw new Error("I don't understand action type ")
	}
}
export const RemoveTodoListAC = (
	todoListID: string
): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListID }
}

export const AddTodoListAC = (title: string): AddTotodlistActionType => {
	return { type: 'ADD-TODOLIST', title }
}

export const ChangeTodoListTitleAC = (
	id: string,
	title: string
): ChangeTotodlistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const ChangeTodoListFilterAC = (
	id: string,
	filter: FilterValueType
): ChangeTotodlistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
