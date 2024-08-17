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
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	fetchTodoListsTC,
	FilterValueType,
	removeTodoListAC,
	setTodoListAC,
	TodoListDomainType,
} from './state/Todolists-reducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootState, useAppDispatch } from './state/store'
import { ChangeTaskStatusAC, ChangeTaskTitleAC } from './state/Task-reducer'
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
			dispatch(ChangeTaskStatusAC(taskId, status, todoListId))
		},
		[dispatch]
	)

	const onChangeTitleHandler = useCallback(
		(newValue: string, taskId: string, todoListId: string) => {
			dispatch(ChangeTaskTitleAC(taskId, newValue, todoListId))
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
			const action = removeTodoListAC(todoListId)
			dispatch(action)
		},
		[dispatch]
	)

	let changeTodoListTitle = useCallback(
		(id: string, newTitle: string) => {
			const action = changeTodoListTitleAC(id, newTitle)
			dispatch(action)
		},
		[dispatch]
	)

	const addTodoList = useCallback(
		(title: string) => {
			const action = addTodoListAC(title)
			dispatch(action)
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
