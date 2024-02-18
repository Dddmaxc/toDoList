import { useState, ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'
import { FilterValueType } from './App'
import { Button } from '@mui/material'
import { AddItemForms } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Checkbox, IconButton } from '@material-ui/core'
import { Check, Delete } from '@mui/icons-material'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string, todoListId: string) => void
	changeFilter: (value: FilterValueType, todoListId: string) => void
	addTask: (title: string, todoListId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todoListId: string
	) => void
	filter: FilterValueType
	removeTodoList: (todoListId: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {
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
		props.addTask(title, props.id)
	}
	return (
		<div>
			<h3>
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
				{props.tasks.map(t => {
					const onRemoveHandler = () => {
						props.removeTask(t.id, props.id)
					}
					const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(t.id, e.currentTarget.checked, props.id)
					}

					const onChangeTitleHandler = (newValue: string) => {
						props.changeTaskTitle(t.id, newValue, props.id)
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
