import { v1 } from 'uuid'
import { FilterValueType, ToDoListType } from '../App'
import { TaskStateType } from './Todolists-reducer.test'

type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	[key: string]: any
	taskId: string
	todoListID: string
}
type AddTaskActionType = {
	title: string
	type: 'ADD-TASK'
	todoListID: string
}
type ChangeTaskStatusActionType = {
	type: 'CHANGE-STATUS-TASK'
	taskId: string
	todoListID: string
	isDone: boolean
}

type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	taskId: string
	title: string
	todoListID: string
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

type RemoveTaskAction1Type =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTotodlistActionType
	| RemoveTodoListActionType

const initialState: TaskStateType = {}

export const tasksReducer = (
	state: TaskStateType = initialState,
	action: RemoveTaskAction1Type
): TaskStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			let stateCopy = { ...state }
			let task = state[action.todoListID]
			let filteredTasks = task.filter(f => f.id !== action.taskId)
			stateCopy[action.todoListID] = filteredTasks

			return stateCopy
		}
		case 'ADD-TASK': {
			let stateCopy = { ...state }
			let tasks = stateCopy[action.todoListID]
			let newTask = { id: v1(), title: action.title, isDone: false }
			let newTasks = [newTask, ...tasks]
			stateCopy[action.todoListID] = newTasks

			return { ...stateCopy }
		}
		case 'CHANGE-STATUS-TASK': {
			let stateCopy = { ...state }
			let tasks = stateCopy[action.todoListID]
			stateCopy[action.todoListID] = tasks.map(t =>
				t.id === action.taskId ? { ...t, isDone: action.isDone } : t
			)
			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			let stateCopy = { ...state }
			let tasks = stateCopy[action.todoListID]
			let task = tasks.find(t => t.id === action.taskId)
			if (task) {
				task.title = action.title
			}
			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.todoListID] = []

			return stateCopy
		}
		case 'REMOVE-TODOLIST': {
			console.log('11111')
			const stateCopy = { ...state }

			delete stateCopy[action.id]

			return stateCopy
		}

		default:
			return state
	}
}
export const removeTaskAC = (
	taskId: string,
	todoListID: string
): RemoveTaskAction1Type => {
	return { type: 'REMOVE-TASK', taskId, todoListID }
}

export const addTaskAC = (
	title: string,
	todoListID: string
): AddTaskActionType => {
	return { type: 'ADD-TASK', todoListID, title }
}

export const ChangeTaskStatusAC = (
	taskId: string,
	isDone: boolean,
	todoListID: string
): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-STATUS-TASK', isDone, todoListID, taskId }
}

export const ChangeTaskTitleAC = (
	taskId: string,
	title: string,
	todoListID: string
): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todoListID, taskId }
}
