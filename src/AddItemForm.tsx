import { IconButton, TextField } from '@material-ui/core'
import { ControlPoint } from '@mui/icons-material'
import React from 'react'
import { ChangeEvent, useState } from 'react'
import { KeyboardEvent } from 'react'

export type AddItemFormsType = {
	addItem: (title: string) => void
}
export const AddItemForms = React.memo((props: AddItemFormsType) => {
	console.log('AddItemForms component is called')
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (newTaskTitle.trim() !== '') {
				props.addItem(newTaskTitle.trim())
				setNewTaskTitle('')
				setError(null)
			} else {
				setError('Field is required')
			}
		}
	}
	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addItem(newTaskTitle.trim())
			setNewTaskTitle('')
		} else {
			setError('Field is required')
		}
	}

	return (
		<>
			<div style={{ margin: '10px' }}>
				<TextField
					value={newTaskTitle}
					variant={'outlined'}
					label={'Type value'}
					onChange={onNewTitleChangeHandler}
					onKeyPress={onKeyPressHandler}
					error={!!error}
					helperText={error}
				/>
				<IconButton onClick={addTask} color={'primary'}>
					<ControlPoint />
				</IconButton>
			</div>
		</>
	)
})
