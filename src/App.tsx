import React, { useState } from 'react'
import './App.css'
import { TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid'
import { AddItemForms } from './AddItemForm'
import {
	AppBar,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
} from '@material-ui/core'
import { Menu } from '@mui/icons-material'
import Typography from '@mui/material/Typography'

export type FilterValueType = 'all' | 'completed' | 'active'

export type ToDoListType = {
	id: string
	title: string
	filter: FilterValueType
}

type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	function removeTask(id: string, todoListId: string) {
		let tasks = tasksObj[todoListId]
		let filteredTasks = tasks.filter(t => t.id !== id)
		tasksObj[todoListId] = filteredTasks
		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todoListId: string) {
		let newTask = { id: v1(), title: title, isDone: false }

		let tasks = tasksObj[todoListId]

		let newTasks = [newTask, ...tasks]
		tasksObj[todoListId] = newTasks
		setTasks({ ...tasksObj })
	}

	function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
		let tasks = tasksObj[todoListId]
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasksObj })
		}
	}
	function changeTaskTitle(
		taskId: string,
		newTitle: string,
		todoListId: string
	) {
		// достаем новый массив по todolistId
		let tasks = tasksObj[todoListId]
		// найдем нужную таску
		let task = tasks.find(t => t.id === taskId)
		// изменим таску если она нашлась
		if (task) {
			task.title = newTitle
			// засетаем в стейт копию обьекта, что бы React отреагировал перерисовкой
			setTasks({ ...tasksObj })
		}
	}

	function changeFilter(value: FilterValueType, todoListId: string) {
		let todoList = toDoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.filter = value
			setToDoList([...toDoLists])
		}
	}

	let todolistId1 = v1()
	let todolistId2 = v1()
	let [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
		},
	])

	let removeTodoList = (todoListId: string) => {
		let filteredTodoList = toDoLists.filter(tl => tl.id !== todoListId)
		setToDoList(filteredTodoList)

		delete tasksObj[todoListId]
		setTasks({ ...tasksObj })
	}

	let changeTodoListTitle = (id: string, newTitle: string) => {
		const todoList = toDoLists.find(tl => tl.id === id)
		if (todoList) {
			todoList.title = newTitle
			setToDoList([...toDoLists])
		}
	}

	let [tasksObj, setTasks] = useState<TaskStateType>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQl', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'House', isDone: true },
			{ id: v1(), title: 'Car', isDone: false },
		],
	})

	const addTodoList = (title: string) => {
		let toDoList: ToDoListType = {
			id: v1(),
			filter: 'all',
			title: title,
		}
		setToDoList([toDoList, ...toDoLists])

		setTasks({
			...tasksObj,
			[toDoList.id]: [],
		})
	}

	return (
		<div className='App'>
			<AppBar position='static' color={'secondary'}>
				<Toolbar variant='dense'>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6' color='inherit' component='div'>
						Photos
					</Typography>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForms addItem={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{toDoLists.map(tl => {
						let taskForToDoList = tasksObj[tl.id]
						if (tl.filter === 'completed') {
							taskForToDoList = taskForToDoList.filter(t => t.isDone === true)
						}
						if (tl.filter === 'active') {
							taskForToDoList = taskForToDoList.filter(t => t.isDone === false)
						}

						return (
							<Grid item>
								<Paper style={{ padding: '20px' }}>
									<TodoList
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={taskForToDoList}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										changeTaskTitle={changeTaskTitle}
										filter={tl.filter}
										removeTodoList={removeTodoList}
										changeTodoListTitle={changeTodoListTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default App
