import { ChangeEvent, useCallback, useEffect } from 'react'
import './App.css'
import { TodoList } from './TodoList'
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
import {
	addTodoListAC,
	addTodoListsTC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	fetchTodoListsTC,
	FilterValueType,
	removeTodoListAC,
	removeTodoListsTC,
	setTodoListAC,
	TodoListDomainType,
	updateTodoListsTC,
} from './state/Todolists-reducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootState, useAppDispatch } from './state/store'
import { updateTaskTC, ChangeTaskTitleAC } from './state/Task-reducer'
import { TaskStatuses, TaskType, todoListsAPI } from './api/todoLists-api'

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodoListsTC())
	}, [])

	const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(
		state => state.todoLists
	)

	const onChangeStatusHandler = useCallback(
		(status: TaskStatuses, taskId: string, todoListId: string) => {
			const thunk = updateTaskTC(taskId, { status }, todoListId)
			dispatch(thunk)
		},
		[dispatch]
	)

	const onChangeTitleHandler = useCallback(
		(newValue: string, taskId: string, todoListId: string) => {
			const thunk = updateTaskTC(taskId, { title: newValue }, todoListId)
			dispatch(thunk)
		},
		[dispatch]
	)

	let changeFilter = useCallback(
		(value: FilterValueType, todoListId: string) => {
			const action = changeTodoListFilterAC(todoListId, value)
			dispatch(action)
		},
		[dispatch]
	)

	let removeTodoList = useCallback(
		(todoListId: string) => {
			const thunk = removeTodoListsTC(todoListId)
			dispatch(thunk)
		},
		[dispatch]
	)

	let changeTodoListTitle = useCallback(
		(id: string, newTitle: string) => {
			const thunk = updateTodoListsTC(id, newTitle)
			dispatch(thunk)
		},
		[dispatch]
	)

	const addTodoList = useCallback(
		(title: string) => {
			const thunk = addTodoListsTC(title)
			dispatch(thunk)
		},
		[dispatch]
	)

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
							<Grid item key={tl.id}>
								<Paper
									style={{
										padding: '20px',
										background: 'transparent',
									}}
								>
									<TodoList
										key={tl.id}
										id={tl.id}
										title={tl.title}
										changeFilter={changeFilter}
										filter={tl.filter}
										removeTodoList={removeTodoList}
										changeTodoListTitle={changeTodoListTitle}
										onChangeStatusHandler={onChangeStatusHandler}
										onChangeTitleHandler={onChangeTitleHandler}
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
