import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer,
} from './Todolists-reducer'
import { v1 } from 'uuid'
import { FilterValueType, ToDoListType } from '../App'
import { TaskType } from '../TodoList'

export type TaskStateType = {
	[key: string]: Array<TaskType>
}
test('current todoList should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('current todoList should be add', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodoListTitle = 'New TodoList'

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})
test('current todoList should be change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodoListTitle = 'New TodoList'

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const action = changeTodoListTitleAC(todolistId2, newTodoListTitle)

	const endState = todoListsReducer(startState, action)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})
test('current filter of todoList should be change ', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: FilterValueType = 'completed'

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const action = changeTodoListFilterAC(todolistId2, newFilter)

	const endState = todoListsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
