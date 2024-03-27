import React, { useReducer, useState } from 'react'
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
import red from '@mui/material/colors'
import {
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	addTaskAC,
	removeTaskAC,
	tasksReducer,
} from './state/Task-reducer'
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer,
} from './state/Todolists-reducer'

export type FilterValueType = 'all' | 'completed' | 'active'

export type ToDoListType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducers() {
	function removeTask(id: string, todoListId: string) {
		const action = removeTaskAC(id, todoListId)
		dispatchTasksReducer(action)
	}

	function addTask(title: string, todoListId: string) {
		const action = addTaskAC(title, todoListId)
		dispatchTasksReducer(action)
	}

	function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
		const action = ChangeTaskStatusAC(taskId, isDone, todoListId)
		dispatchTasksReducer(action)
	}

	function changeTaskTitle(
		taskId: string,
		newTitle: string,
		todoListId: string
	) {
		const action = ChangeTaskTitleAC(taskId, todoListId, newTitle)
		dispatchTasksReducer(action)
	}

	function changeFilter(value: FilterValueType, todoListId: string) {
		const action = changeTodoListFilterAC(todoListId, value)
		dispatchTodoListReducer(action)
	}

	let todolistId1 = v1()
	let todolistId2 = v1()
	let [toDoLists, dispatchTodoListReducer] = useReducer(todoListsReducer, [
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
		const action = removeTodoListAC(todoListId)
		dispatchTasksReducer(action)
		dispatchTodoListReducer(action)
	}

	let changeTodoListTitle = (id: string, newTitle: string) => {
		const action = changeTodoListTitleAC(id, newTitle)
		dispatchTodoListReducer(action)
	}

	let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
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
		const action = addTodoListAC(title)
		dispatchTodoListReducer(action)
	}

	return (
		<div className='App'>
			<AppBar position='static' color={'secondary'}>
				<Toolbar variant='dense'>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6' color='inherit' component='div'>
						TodoList
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
										changeFilter={changeFilter}
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

export default AppWithReducers
