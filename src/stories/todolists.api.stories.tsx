import React, { useEffect, useState } from 'react'
import {
	TaskType,
	UpdateTasksModelResponseType,
	todoListsAPI,
} from '../api/todoLists-api'

export default {
	title: 'API',
}

export const settings = {
	withCredentials: true,
	headers: {
		'API-Key': 'e1a6e491-0aa1-4106-93a0-5b2ea39aedff',
	},
}

export const GetTodoList = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todoListsAPI.getTodoLists().then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todoListsAPI.CreateTodoList('Naruto').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState<any>('')

	const deleteTask = () => {
		todoListsAPI.DeleteTodoList(todoListId).then(res => {
			setState(res.data)
		})
	}
	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<input
					placeholder={'todoListId'}
					value={todoListId}
					onChange={e => {
						setTodoListId(e.currentTarget.value)
					}}
				/>
				<button onClick={deleteTask}>delete task</button>
			</div>
		</div>
	)
}

export const UpdateTodoList = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		let todoListId = 'eecf5ae6-b212-4b81-93b3-fe89c543b31b'
		todoListsAPI.UpdateTodoList(todoListId, 'Saske').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todoListId = 'acb99b0b-3162-4709-9a1a-e206932cb99e'
		todoListsAPI.getTasks(todoListId).then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState<any>('')
	const [tasksId, setTasksId] = useState<any>('')

	const deleteTask = () => {
		todoListsAPI.deleteTask(todoListId, tasksId).then(res => {
			setState(res.data)
		})
	}
	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<input
					placeholder={'todoListId'}
					value={todoListId}
					onChange={e => {
						setTodoListId(e.currentTarget.value)
					}}
				/>
				<input
					placeholder={'tasksId'}
					value={tasksId}
					onChange={e => {
						setTasksId(e.currentTarget.value)
					}}
				/>
				<button onClick={deleteTask}>delete task</button>
			</div>
		</div>
	)
}

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		let todoListId = ''
		let tasksId = ''

		let model: UpdateTasksModelResponseType = {
			title: '',
			description: '',
			completed: false,
			status: 0,
			priority: 0,
			startDate: '',
			deadline: '',
		}
		todoListsAPI.updateTask(todoListId, tasksId, model).then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	let todoListId = '45e09f82-26f9-4658-bc08-86b7ddbba9ab'
	let tasksId = ''
	useEffect(() => {
		todoListsAPI.CreateTask(todoListId, 'Fear The Pain').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
