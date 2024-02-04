import React, { useState } from 'react'
import './App.css'
import { TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid'

export type FilterValueType = 'all' | 'completed' | 'active'

type ToDoListType = {
	id: string
	title: string
	filter: FilterValueType
}

function App() {
	function removeTask(id: string, todoListId: string) {
		let tasks = tasksObj[todoListId]
		let filteredTasks = tasks.filter(t => t.id !== id)
		tasksObj[todoListId] = filteredTasks
		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todoListId: string) {
		let newTask = { id: v1(), title: title, isDone: false }

		let tasks = tasksObj[todoListId]

		let newTasks = [newTask, ...tasks]
		tasksObj[todoListId] = newTasks
		setTasks({ ...tasksObj })
	}

	function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
		let tasks = tasksObj[todoListId]
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasksObj })
		}
	}

	function changeFilter(value: FilterValueType, todoListId: string) {
		let todoList = toDoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.filter = value
			setToDoList([...toDoLists])
		}
	}

	let todolistId1 = v1()
	let todolistId2 = v1()
	let [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'active',
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'completed',
		},
	])

	let removeTodoList = (todoListId: string) => {
		let filteredTodoList = toDoLists.filter(tl => tl.id !== todoListId)
		setToDoList(filteredTodoList)

		delete tasksObj[todoListId]
		setTasks({ ...tasksObj })
	}

	let [tasksObj, setTasks] = useState({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQl', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'House', isDone: true },
			{ id: v1(), title: 'Car', isDone: false },
		],
	})

	return (
		<div className='App'>
			{toDoLists.map(tl => {
				let taskForToDoList = tasksObj[tl.id]
				if (tl.filter === 'completed') {
					taskForToDoList = taskForToDoList.filter(t => t.isDone === true)
				}
				if (tl.filter === 'active') {
					taskForToDoList = taskForToDoList.filter(t => t.isDone === false)
				}

				return (
					<TodoList
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={taskForToDoList}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeStatus={changeStatus}
						filter={tl.filter}
						removeTodoList={removeTodoList}
					/>
				)
			})}
		</div>
	)
}

export default App
