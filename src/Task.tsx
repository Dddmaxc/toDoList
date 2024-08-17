import { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@mui/icons-material'
import React from 'react'
import { EditableSpan } from './EditableSpan'
import { TaskStatuses, TaskType } from './api/todoLists-api'

type TaskPropsType = {
	task: TaskType
	todoListId: string
	onRemoveHandler: (taskId: string, todoId: string) => void
	onChangeStatusHandler: (
		status: TaskStatuses,
		taskId: string,
		todoListId: string
	) => void
	onChangeTitleHandler: (
		newValue: string,
		taskId: string,
		todoListId: string
	) => void
}

export const Task = React.memo((props: TaskPropsType) => {
	const onRemoveHandlerCallback = () => {
		props.onRemoveHandler(props.task.id, props.todoListId)
	}
	const onChangeStatusHandlerCallback = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const status = e.currentTarget.checked
				? TaskStatuses.Completed
				: TaskStatuses.New
			props.onChangeStatusHandler(status, props.task.id, props.todoListId)
		},
		[props.task.id, props.todoListId]
	)

	const onChangeTitleHandlerCallback = useCallback(
		(newValue: string) => {
			props.onChangeTitleHandler(newValue, props.task.id, props.todoListId)
		},
		[props.task.id]
	)

	return (
		<div
			key={props.task.id}
			className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
		>
			<Checkbox
				onChange={onChangeStatusHandlerCallback}
				checked={props.task.status === TaskStatuses.Completed}
			/>
			<EditableSpan
				title={props.task.title}
				onChange={onChangeTitleHandlerCallback}
			/>
			<IconButton onClick={onRemoveHandlerCallback}>
				<Delete />
			</IconButton>
		</div>
	)
})
