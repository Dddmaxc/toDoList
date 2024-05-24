import { action } from '@storybook/addon-actions'
import { Task } from '../Task'

export default {
	title: 'Task components',
	component: Task,
}

const changeTaskStatusCallback = action('change status')
const changeTaskTitleCallback = action('change title')
const RemoveTaskCallback = action('remove task')

export const TaskBaseExample = () => {
	return (
		<>
			<Task
				task={{ id: '1', isDone: true, title: 'CSS' }}
				todoListId={'todoList1'}
				onRemoveHandler={RemoveTaskCallback}
				onChangeStatusHandler={changeTaskStatusCallback}
				onChangeTitleHandler={changeTaskTitleCallback}
			/>
			<Task
				task={{ id: '2', isDone: false, title: 'HTML' }}
				todoListId={'todoList2'}
				onRemoveHandler={RemoveTaskCallback}
				onChangeStatusHandler={changeTaskStatusCallback}
				onChangeTitleHandler={changeTaskTitleCallback}
			/>
		</>
	)
}
