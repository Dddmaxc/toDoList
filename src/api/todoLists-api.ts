import axios from 'axios'

const settings = {
	withCredentials: true,
	headers: {
		'API-Key': 'e1a6e491-0aa1-4106-93a0-5b2ea39aedff',
	},
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings,
})

export type TodoListType = {
	id: string
	title: string
	addedData: string
	order: number
}

export type CreateTodoListResponseType = {
	resultCode: number
	message: Array<string>
	data: {
		item: TodoListType
	}
}
export type DeleteTodoListResponseType = {
	resultCode: number
	message: Array<string>
	data: {}
}
export type UpdateTodoListResponseType = {
	resultCode: number
	message: Array<string>
	data: {}
}

type ResponseType<D = {}> = {
	resultCode: number
	message: Array<string>
	data: D
}

export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

type GetTasksResponseType = {
	error: string | null
	totalCount: number
	item: TaskType[]
}

export type UpdateTasksModelResponseType = {
	title: string
	description: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
}

export const todoListsAPI = {
	getTodoLists() {
		const promise = instance.get<Array<TodoListType>>('todo-lists')
		return promise
	},
	CreateTodoList(title: string) {
		const promise = instance.post<ResponseType<{ item: TodoListType }>>(
			'todo-lists',
			{ title: title }
		)
		return promise
	},
	DeleteTodoList(id: string) {
		const promise = instance.delete<ResponseType>(`todo-lists/ ${id}`)
		return promise
	},
	UpdateTodoList(id: string, title: string) {
		const promise = instance.put<ResponseType>(`todo-lists/ ${id}`, {
			title: title,
		})
		return promise
	},

	getTasks(todoListId: string) {
		return instance.get<GetTasksResponseType>(`todo-lists/ ${todoListId}/tasks`)
	},

	deleteTask(todoListId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`todo-lists/ ${todoListId}/tasks/ ${taskId}`
		)
	},

	updateTask(
		todoListId: string,
		taskId: string,
		model: UpdateTasksModelResponseType
	) {
		return instance.put<ResponseType>(
			`todo-lists/${todoListId}/tasks/${taskId}`,
			model
		)
	},

	CreateTask(todoListId: string, taskId: string, title: string) {
		const promise = instance.post<ResponseType<{ item: TodoListType }>>(
			`todo-lists/ ${todoListId}/tasks/ ${taskId}`,
			{ title: title }
		)
		return promise
	},
}
