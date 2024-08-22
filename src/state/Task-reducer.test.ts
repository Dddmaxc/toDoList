import {
	updateTaskAC,
	ChangeTaskTitleAC,
	addTaskAC,
	removeTaskAC,
	tasksReducer,
} from './Task-reducer'
import { TaskStateType } from '../AppWithRedux'
import { addTodoListAC, removeTodoListAC } from './Todolists-reducer'
import { TaskPriorities, TaskStatuses } from '../api/todoLists-api'

test('correct task should be deleted from correct array', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
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
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
	}

	// const action = addTaskAC('Juce', 'todoListId2')
	const action = addTaskAC({
		todoListId: 'todoListId1',
		title: 'lol',
		status: TaskStatuses.New,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 0,
		startDate: '',
		completed: false,
		id: '2',
	})
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId1.length).toBe(5)
	expect(andState.todoListId2.length).toBe(3)
	expect(andState.todoListId2[0].id).toBeDefined()
	expect(andState.todoListId2[0].title).toBe('lol')
	expect(andState.todoListId2[0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be change', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
	}

	const action = updateTaskAC('2', { status: TaskStatuses.New }, 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId2[1].status).toBeFalsy()
	expect(andState.todoListId1[0].status).toBeTruthy()
})
test('title of specified task should be change', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
	}

	const action = updateTaskAC('2', { title: 'MilkyWay' }, 'todoListId2')
	const andState = tasksReducer(startState, action)

	expect(andState.todoListId2[1].title).toBe('MilkyWay')
	expect(andState.todoListId2[0].title).toBe('House')
})
test('new property with new array should be added when todoList is added', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
	}

	const action = addTodoListAC({
		id: 'lol',
		title: 'new todoList',
		order: 0,
		addedData: '',
	})
	const andState = tasksReducer(startState, action)

	const keys = Object.keys(andState)
	const newKeys = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
	if (!newKeys) {
		throw new Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(andState[newKeys]).toEqual([])
})
test('property with todoList should be deleted', () => {
	const startState: TaskStateType = {
		todoListId1: [
			{
				id: '1',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '3',
				title: 'ReactJS',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '4',
				title: 'Rest API',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '5',
				title: 'GraphQl',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
		todoListId2: [
			{
				id: '1',
				title: 'House',
				status: TaskStatuses.Completed,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
			{
				id: '2',
				title: 'Car',
				status: TaskStatuses.New,
				todoListId: '',
				description: '',
				completed: false,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
			},
		],
	}

	const action = removeTodoListAC('todoListId2')
	const andState = tasksReducer(startState, action)

	const keys = Object.keys(andState)

	expect(keys.length).toBe(1)
	expect(andState.todoListId2).not.toBeDefined()
})
// test('task should be added for todoList ', () => {
// 	const action = setTaskAC(startState['todoListId1'], 'todoListId1')

// 	const andState = tasksReducer({
// 		todoListId2: [],
// 		todoListId1: [],
// 	})

// 	expect(endState["todoList1"].length).toBe(5)
// 	expect(endState["todolist2"].length).toBe(2)

// })
