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
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootState } from './state/store'

export type FilterValueType = 'all' | 'completed' | 'active'

export type ToDoListType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const dispatch = useDispatch()
	const todoLists = useSelector<AppRootState, Array<ToDoListType>>(
		state => state.todoLists
	)
	const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

	function changeFilter(value: FilterValueType, todoListId: string) {
		const action = changeTodoListFilterAC(todoListId, value)
		dispatch(action)
	}

	let removeTodoList = (todoListId: string) => {
		const action = removeTodoListAC(todoListId)
		dispatch(action)
	}

	let changeTodoListTitle = (id: string, newTitle: string) => {
		const action = changeTodoListTitleAC(id, newTitle)
		dispatch(action)
	}

	const addTodoList = (title: string) => {
		const action = addTodoListAC(title)
		dispatch(action)
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
					{todoLists.map(tl => {
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

export default AppWithRedux
