import { useDispatch } from 'react-redux'
import { TaskType } from '../TodoList'
import {
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	removeTaskAC,
} from './Task-reducer'
import { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../EditableSpan'
import { Delete } from '@mui/icons-material'
import React from 'react'

type TaskPropsType = {
	task: TaskType
	todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
	const dispatch = useDispatch()

	const onRemoveHandler = () => {
		dispatch(removeTaskAC(props.task.id, props.todoListId))
	}
	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		dispatch(
			ChangeTaskStatusAC(props.task.id, newIsDoneValue, props.todoListId)
		)
	}

	const onChangeTitleHandler = useCallback(
		(newValue: string) => {
			dispatch(ChangeTaskTitleAC(props.task.id, newValue, props.todoListId))
		},
		[props.task.id, props.todoListId]
	)

	return (
		<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
			<Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone} />
			<EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
			<IconButton onClick={onRemoveHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
