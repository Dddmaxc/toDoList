import { ChangeEvent, useCallback } from 'react'
import { FilterValueType } from './AppWithRedux'
import { Button } from '@mui/material'
import { AddItemForms } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { IconButton } from '@material-ui/core'
import { Delete } from '@mui/icons-material'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'
import {
	ChangeTaskStatusAC,
	addTaskAC,
	removeTaskAC,
} from './state/Task-reducer'
import React from 'react'
import { Task } from './Task'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	changeFilter: (value: FilterValueType, todoListId: string) => void
	filter: FilterValueType
	removeTodoList: (todoListId: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
	onChangeStatusHandler: (
		value: boolean,
		taskId: string,
		todoListId: string
	) => void
	onChangeTitleHandler: (
		newValue: string,
		taskId: string,
		todoListId: string
	) => void
}

export const TodoList = React.memo(function (props: PropsType) {
	const tasks = useSelector<AppRootState, Array<TaskType>>(
		state => state.tasks[props.id]
	)
	const dispatch = useDispatch()

	const onAllClickHandler = useCallback(
		() => props.changeFilter('all', props.id),
		[]
	)
	const onActiveClickHandler = useCallback(
		() => props.changeFilter('active', props.id),
		[]
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeFilter('completed', props.id),
		[]
	)
	const removeTodoList = useCallback(() => {
		props.removeTodoList(props.id)
	}, [])
	const changeTodoListTitle = useCallback(
		(newTitle: string) => {
			props.changeTodoListTitle(props.id, newTitle)
		},
		[props.id, props.changeTodoListTitle]
	)

	const addTask = useCallback((title: string) => {
		dispatch(addTaskAC(title, props.id))
	}, [])

	const onRemoveHandler = (taskId: string, todoListId: string) => {
		dispatch(removeTaskAC(taskId, todoListId))
	}

	let allTodoListTasks = tasks
	let tasksForTodoList = allTodoListTasks

	if (props.filter === 'completed') {
		tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
	}
	if (props.filter === 'active') {
		tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
	}

	return (
		<div className='container'>
			<h3 style={{ margin: '20px' }}>
				<EditableSpan
					title={props.title || ''}
					onChange={changeTodoListTitle}
				/>
				<IconButton onClick={removeTodoList}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForms addItem={addTask} />
			<div>
				{tasksForTodoList.map(t => (
					<Task
						task={t}
						todoListId={props.id}
						key={t.id}
						onRemoveHandler={onRemoveHandler}
						onChangeStatusHandler={props.onChangeStatusHandler}
						onChangeTitleHandler={props.onChangeTitleHandler}
					/>
				))}
			</div>
			<div>
				<Button
					color='success'
					variant={props.filter === 'all' ? 'contained' : 'text'}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					color={'primary'}
					variant={props.filter === 'active' ? 'contained' : 'text'}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					color={'secondary'}
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
