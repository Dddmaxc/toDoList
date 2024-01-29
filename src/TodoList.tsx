import { useState, ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'
import { FilterValueType } from './App'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title?: string
	tasks: Array<TaskType>
	removeTask: (id: string) => void
	changeFilter: (value: FilterValueType) => void
	addTask: (title: string) => void
	changeStatus: (taskId: string, isDone: boolean) => void
	filter: FilterValueType
}

export const TodoList = (props: PropsType) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle.trim())
			setNewTaskTitle('')
		} else {
			setError('Field is required')
		}
	}

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
	}

	const onAllClickHandler = () => props.changeFilter('all')
	const onActiveClickHandler = () => props.changeFilter('active')
	const onCompletedClickHandler = () => props.changeFilter('completed')
	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTitleChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<button onClick={addTask}>+</button>
				{error && <div className='error-message'>{error}</div>}
			</div>
			<ul>
				{props.tasks.map(t => {
					const onRemoveHandler = () => {
						props.removeTask(t.id)
					}
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(t.id, e.currentTarget.checked)
					}

					return (
						<li key={t.id} className={t.isDone ? 'is-done' : ''}>
							<input
								type='checkbox'
								onChange={onChangeHandler}
								onKeyPress={onKeyPressHandler}
								checked={t.isDone}
							/>
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}
				>
					Completed
				</button>
			</div>
		</div>
	)
}
