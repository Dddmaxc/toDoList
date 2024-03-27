import { useState, ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'
import { FilterValueType } from './App'
import { Button } from '@mui/material'
import { AddItemForms } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Checkbox, IconButton } from '@material-ui/core'
import { Check, Delete } from '@mui/icons-material'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'
import { TaskStateType } from './AppWithRedux'
import {
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	addTaskAC,
	removeTaskAC,
} from './state/Task-reducer'
import { title } from 'process'

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
}

export const TodoList = (props: PropsType) => {
	const tasks = useSelector<AppRootState, Array<TaskType>>(
		state => state.tasks[props.id]
	)
	const dispatch = useDispatch()

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)
	const removeTodoList = () => {
		props.removeTodoList(props.id)
	}
	const changeTodoListTitle = (newTitle: string) => {
		props.changeTodoListTitle(props.id, newTitle)
	}

	const addTask = (title: string) => {
		dispatch(addTaskAC(title, props.id))
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
			<AddItemForms
				addItem={title => {
					dispatch(addTaskAC(title, props.id))
				}}
			/>
			<div>
				{tasksForTodoList.map(t => {
					const onRemoveHandler = () => {
						dispatch(removeTaskAC(t.id, props.id))
					}
					const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked
						dispatch(ChangeTaskStatusAC(t.id, newIsDoneValue, props.id))
					}

					const onChangeTitleHandler = (newValue: string) => {
						dispatch(ChangeTaskTitleAC(t.id, newValue, props.id))
					}

					return (
						<div key={t.id} className={t.isDone ? 'is-done' : ''}>
							<Checkbox onChange={onChangeStatusHandler} checked={t.isDone} />
							<EditableSpan title={t.title} onChange={onChangeTitleHandler} />
							<IconButton onClick={onRemoveHandler}>
								<Delete />
							</IconButton>
						</div>
					)
				})}
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
}
