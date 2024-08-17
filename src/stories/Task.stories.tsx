import { action } from '@storybook/addon-actions'
import { Task } from '../Task'
import { TaskPriorities, TaskStatuses } from '../api/todoLists-api'

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
				task={{
					id: '1',
					status: TaskStatuses.Completed,
					title: 'CSS',
					todoListId: '',
					description: '',
					completed: false,
					startDate: '',
					deadline: '',
					addedDate: '',
					order: 0,
					priority: TaskPriorities.Low,
				}}
				todoListId={'todoList1'}
				onRemoveHandler={RemoveTaskCallback}
				onChangeStatusHandler={changeTaskStatusCallback}
				onChangeTitleHandler={changeTaskTitleCallback}
			/>
			<Task
				task={{
					id: '2',
					status: TaskStatuses.Completed,
					title: 'HTML',
					todoListId: '',
					description: '',
					completed: false,
					startDate: '',
					deadline: '',
					addedDate: '',
					order: 0,
					priority: TaskPriorities.Low,
				}}
				todoListId={'todoList2'}
				onRemoveHandler={RemoveTaskCallback}
				onChangeStatusHandler={changeTaskStatusCallback}
				onChangeTitleHandler={changeTaskTitleCallback}
			/>
		</>
	)
}
