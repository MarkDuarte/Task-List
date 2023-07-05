import { useState } from 'react'

type Task = {
  id: number
  text: string
  completed: boolean
}

type TaskListProps = {
  tasks: Task[]
  onTaskComplete: (taskId: number) => void
  onTaskDelete: (taskId: number) => void
}

export function TaskList({
  tasks,
  onTaskComplete,
  onTaskDelete,
}: TaskListProps) {
  const [filter, setFilter] = useState<string>('all')

  const handleFilterChange = (filterType: string) => {
    setFilter(filterType)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return (
    <div>
      <div className="flex mb-4 space-x-3">
        <span className="px-3 py-2">Filtros:</span>
        <button
          className={`task-filter-button rounded bg-blue-500 text-white px-4 py-2 ${
            filter === 'all' ? 'active' : ''
          }`}
          onClick={() => handleFilterChange('all')}
        >
          Todas
        </button>
        <button
          className={`task-filter-button rounded bg-green-500 text-white px-4 py-2 ${
            filter === 'completed' ? 'active' : ''
          }`}
          onClick={() => handleFilterChange('completed')}
        >
          Concluídas
        </button>
        <button
          className={`task-filter-button rounded bg-red-500 text-white px-4 py-2 ${
            filter === 'pending' ? 'active' : ''
          }`}
          onClick={() => handleFilterChange('pending')}
        >
          Pendentes
        </button>
      </div>
      <h1>Tarefas</h1>
      <ul className="list-disc pl-6">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`${
              task.completed ? 'line-through text-gray-500' : ''
            } mb-2 flex items-center`}
          >
            <span className="flex-grow">{task.text}</span>
            <button
              className="ml-2 rounded bg-blue-500 py-1 px-2 text-white"
              onClick={() => onTaskComplete(task.id)}
            >
              Concluir
            </button>
            <button
              className="ml-2 rounded bg-red-500 py-1 px-2 text-white"
              onClick={() => onTaskDelete(task.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
