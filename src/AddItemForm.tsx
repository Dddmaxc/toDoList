import { Button } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import { KeyboardEvent } from 'react'

export type AddItemFormsType = {
	addItem: (title: string) => void
}
export const AddItemForms = (props: AddItemFormsType) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
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
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTitleChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<Button onClick={addTask} variant={'contained'} color={'primary'}>
					+
				</Button>
				{error && <div className='error-message'>{error}</div>}
			</div>
		</>
	)
}
