import { v1 } from 'uuid'
import {
	TaskPriorities,
	TaskStatuses,
	TaskType,
	todoListsAPI,
} from '../api/todoLists-api'
import { TaskStateType } from '../AppWithRedux'
import { setTodoListAC, SetTodoListActionType } from './Todolists-reducer'
import { Dispatch } from 'redux'

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
	status: TaskStatuses
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
	filter: TaskStatuses
}
export type SetTaskActionType = {
	type: 'SET-TASKS'
	task: Array<TaskType>
	todoListID: string
}

type RemoveTaskAction1Type =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTotodlistActionType
	| RemoveTodoListActionType
	| SetTodoListActionType
	| SetTaskActionType

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
			let newTask = {
				id: v1(),
				title: action.title,
				status: TaskStatuses.New,
				todoListId: action.todoListID,
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			}
			let newTasks = [newTask, ...tasks]
			stateCopy[action.todoListID] = newTasks

			return { ...stateCopy }
		}
		case 'CHANGE-STATUS-TASK': {
			let stateCopy = { ...state }
			let tasks = stateCopy[action.todoListID]
			stateCopy[action.todoListID] = tasks.map(t =>
				t.id === action.taskId ? { ...t, status: action.status } : t
			)
			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			let stateCopy = { ...state }
			let originTasks = stateCopy[action.todoListID]

			const updateTasks = originTasks.map(task => {
				if (task.id === action.taskId) {
					return { ...task, title: action.title }
				}
				return task
			})
			stateCopy[action.todoListID] = updateTasks
			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.todoListID] = []

			return stateCopy
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state }

			delete stateCopy[action.id]

			return stateCopy
		}
		case 'SET-TODOLIST': {
			const copyState = { ...state }
			action.todoList.forEach(tl => {
				copyState[tl.id] = []
			})

			return copyState
		}
		case 'SET-TASKS':
			const copyState = { ...state }
			copyState[action.todoListID] = action.task
			return copyState
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
	status: TaskStatuses,
	todoListID: string
): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-STATUS-TASK', status, todoListID, taskId }
}

export const ChangeTaskTitleAC = (
	taskId: string,
	title: string,
	todoListID: string
): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todoListID, taskId }
}
export const setTasksAC = (
	task: Array<TaskType>,
	todoListID: string
): SetTaskActionType => {
	return { type: 'SET-TASKS', task, todoListID }
}

export const fetchTasksTC = (todoListID: string) => {
	return (dispatch: Dispatch) => {
		todoListsAPI.getTasks(todoListID).then(res => {
			const tasks = res.data.items
			const action = setTasksAC(tasks, todoListID)
			dispatch(action)
		})
	}
}
