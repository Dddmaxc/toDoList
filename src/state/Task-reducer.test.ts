import {
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	addTaskAC,
	removeTaskAC,
	tasksReducer,
} from './Task-reducer'
import { TaskStateType } from '../AppWithRedux'
import { addTodoListAC, removeTodoListAC } from './Todolists-reducer'

test('correct task should be deleted from correct array', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = removeTaskAC('2', 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId1.length).toBe(5)
	expect(andState.todoListId2.length).toBe(1)
	expect(andState.todoListId2.every(t => t.id !== '2')).toBeTruthy
})

test('correct task should be added to correct array', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = addTaskAC('Juce', 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId1.length).toBe(5)
	expect(andState.todoListId2.length).toBe(3)
	expect(andState.todoListId2[0].id).toBeDefined()
	expect(andState.todoListId2[0].title).toBe('Juce')
	expect(andState.todoListId2[0].isDone).toBe(false)
})

test('status of specified task should be change', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: false },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = ChangeTaskStatusAC('2', false, 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId2[1].isDone).toBeFalsy()
	expect(andState.todoListId1[0].isDone).toBeTruthy()
})
test('title of specified task should be change', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: false },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = ChangeTaskTitleAC('2', 'MilkyWay', 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId2[1].title).toBe('MilkyWay')
	expect(andState.todoListId2[0].title).toBe('House')
})
test('new property with new array should be added when todoList is added', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: false },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = addTodoListAC('new TodoList')
	const andState = tasksReducer(startState, action)

	const keys = Object.keys(andState)
	const newKeys = keys?.find(k => k != 'todoListId1' && k != 'todoListId2')
	if (!newKeys) {
		throw new Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(andState[newKeys]).toEqual([])
})
test('property with todoList should be deleted', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: false },
			{ id: '3', title: 'ReactJS', isDone: false },
			{ id: '4', title: 'Rest API', isDone: true },
			{ id: '5', title: 'GraphQl', isDone: false },
		],
		todoListId2: [
			{ id: '1', title: 'House', isDone: true },
			{ id: '2', title: 'Car', isDone: false },
		],
	}

	const action = removeTodoListAC('todoListId2')
	const andState = tasksReducer(startState, action)

	const keys = Object.keys(andState)

	expect(keys.length).toBe(1)
	expect(andState.todoListId2).not.toBeDefined()
})
