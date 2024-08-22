import { TaskStateType } from '../AppWithRedux'
import { tasksReducer } from './Task-reducer'
import {
	addTodoListAC,
	TodoListDomainType,
	todoListsReducer,
} from './Todolists-reducer'

test('its should be equals', () => {
	const startTasksState: TaskStateType = {}
	const startTodoListState: Array<TodoListDomainType> = []

	const action = addTodoListAC({
		id: 'any',
		title: 'new todoList',
		order: 0,
		addedData: '',
	})
	const endTaskState = tasksReducer(startTasksState, action)
	const endTodoListState = todoListsReducer(startTodoListState, action)

	const keys = Object.keys(endTaskState)
	const idFromTasks = keys[0]
	const idFromTodoLists = endTodoListState[0].id

	expect(idFromTasks).toBe(action.todoList.id)
	expect(idFromTodoLists).toBe(action.todoList.id)
})
