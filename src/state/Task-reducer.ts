import { TaskStatuses, TaskType, todoListsAPI } from '../api/todoLists-api'
import { TaskStateType } from '../AppWithRedux'
import { SetTodoListActionType } from './Todolists-reducer'
import { Dispatch } from 'redux'

type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	[key: string]: any
	taskId: string
	todoListId: string
}
type AddTaskActionType = {
	task: TaskType
	type: 'ADD-TASK'
}
type ChangeTaskStatusActionType = {
	type: 'CHANGE-STATUS-TASK'
	taskId: string
	todoListId: string
	status: TaskStatuses
}

type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	taskId: string
	title: string
	todoListId: string
}

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
	filter: TaskStatuses
}
export type SetTaskActionType = {
	type: 'SET-TASKS'
	task: Array<TaskType>
	todoListId: string
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
			let task = state[action.todoListId]
			let filteredTasks = task.filter(f => f.id !== action.taskId)
			stateCopy[action.todoListId] = filteredTasks

			return stateCopy
		}
		case 'ADD-TASK': {
			let stateCopy = { ...state }
			let newTask = action.task
			let tasks = stateCopy[newTask.todoListId]
			let newTasks = [newTask, ...tasks]
			stateCopy[newTask.todoListId] = newTasks

			return { ...stateCopy }
		}
		case 'CHANGE-STATUS-TASK': {
			let stateCopy = { ...state }
			let tasks = stateCopy[action.todoListId]
			stateCopy[action.todoListId] = tasks.map(t =>
				t.id === action.taskId ? { ...t, status: action.status } : t
			)
			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			let stateCopy = { ...state }
			let originTasks = stateCopy[action.todoListId]

			const updateTasks = originTasks.map(task => {
				if (task.id === action.taskId) {
					return { ...task, title: action.title }
				}
				return task
			})
			stateCopy[action.todoListId] = updateTasks
			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.todoListId] = []

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
			copyState[action.todoListId] = action.task
			return copyState
		default:
			return state
	}
}
export const removeTaskAC = (
	taskId: string,
	todoListId: string
): RemoveTaskAction1Type => {
	return { type: 'REMOVE-TASK', taskId, todoListId }
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
	return { type: 'ADD-TASK', task }
}

export const ChangeTaskStatusAC = (
	taskId: string,
	status: TaskStatuses,
	todoListId: string
): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-STATUS-TASK', status, todoListId, taskId }
}

export const ChangeTaskTitleAC = (
	taskId: string,
	title: string,
	todoListId: string
): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todoListId, taskId }
}
export const setTasksAC = (
	task: Array<TaskType>,
	todoListId: string
): SetTaskActionType => {
	return { type: 'SET-TASKS', task, todoListId }
}

export const fetchTasksTC = (todoListId: string) => {
	return (dispatch: Dispatch) => {
		todoListsAPI.getTasks(todoListId).then(res => {
			const tasks = res.data.items
			const action = setTasksAC(tasks, todoListId)
			dispatch(action)
		})
	}
}

export const removeTasksTC = (todoListId: string, taskId: string) => {
	return (dispatch: Dispatch) => {
		todoListsAPI.deleteTask(todoListId, taskId).then(res => {
			const action = removeTaskAC(taskId, todoListId)
			dispatch(action)
		})
	}
}

export const addTasksTC = (todoListId: string, title: string) => {
	return (dispatch: Dispatch) => {
		todoListsAPI.CreateTask(todoListId, title).then(res => {
			const task = res.data.data
			const action = addTaskAC(task.item)
			dispatch(action)
		})
	}
}
