import React, { useState } from 'react'

type TaskFormProps = {
  onSubmit: (text: string) => void
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 px-4 py-2 mr-2 rounded"
        placeholder="Digite uma nova tarefa"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Adicionar
      </button>
    </form>
  )
}
