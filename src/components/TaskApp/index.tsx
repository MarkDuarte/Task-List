import { useState, useEffect } from 'react'
import { TaskForm } from '../TaskForm'
import { TaskList } from '../TaskList'

type Task = {
  id: number
  text: string
  completed: boolean
}

export function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCompletedTasks, setShowCompletedTasks] = useState<boolean | null>(
    true,
  )

  const addTask = (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const completeTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const filterTasks = (completed: boolean | null) => {
    setShowCompletedTasks(completed)
  }

  const markAllTasksAsCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true })),
    )
  }

  const filteredTasks = showCompletedTasks
    ? tasks
    : tasks.filter((task) => !task.completed)

  useEffect(() => {
    filterTasks(true)
  }, [])

  return (
    <div className="task-app px-4 py-2">
      <TaskForm onSubmit={addTask} />

      <TaskList
        tasks={filteredTasks}
        onTaskComplete={completeTask}
        onTaskDelete={deleteTask}
      />

      <button
        className="task-app-mark-all-button my-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={markAllTasksAsCompleted}
      >
        Marcar todas como concluídas
      </button>
    </div>
  )
}
