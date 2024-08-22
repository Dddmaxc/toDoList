import { TodoListType } from '../api/todoLists-api'
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	FilterValueType,
	removeTodoListAC,
	setTodoListAC,
	TodoListDomainType,
	todoListsReducer,
} from './Todolists-reducer'
import { v1 } from 'uuid'

test('current todoList should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodoListDomainType> = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			addedData: '',
			order: 0,
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			addedData: '',
			order: 0,
		},
	]

	const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('current todoList should be add', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let todoList: TodoListType = {
		title: 'new todoList',
		id: 'any',
		addedData: '',
		order: 0,
	}

	const startState: Array<TodoListDomainType> = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			addedData: '',
			order: 0,
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			addedData: '',
			order: 0,
		},
	]

	const endState = todoListsReducer(startState, addTodoListAC(todoList))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(todoList.title)
	expect(endState[2].filter).toBe('all')
})
test('current todoList should be change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodoListTitle = 'New TodoList'

	const startState: Array<TodoListDomainType> = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			addedData: '',
			order: 0,
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			addedData: '',
			order: 0,
		},
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

	const startState: Array<TodoListDomainType> = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			addedData: '',
			order: 0,
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			addedData: '',
			order: 0,
		},
	]

	const action = changeTodoListFilterAC(todolistId2, newFilter)

	const endState = todoListsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
test('todolist should be set to the state ', () => {
	const startState: TodoListType[] = []

	const action = setTodoListAC(startState)

	const endState = todoListsReducer([], action)

	expect(endState.length).toBe(0)
})
