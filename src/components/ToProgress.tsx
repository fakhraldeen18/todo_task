import React, { FormEvent } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { typeTodo } from "@/types/Index"
type typeForm = {
  todo: typeTodo[]
  setTodo: React.Dispatch<React.SetStateAction<typeTodo[]>>
  progress: typeTodo[]
  setProgress: React.Dispatch<React.SetStateAction<typeTodo[]>>
  cards: {
    todo: typeTodo[]
    progress: typeTodo[]
    completed: typeTodo[]
  }
  setCards: React.Dispatch<
    React.SetStateAction<{
      todo: typeTodo[]
      progress: typeTodo[]
      completed: typeTodo[]
    }>
  >
  id: number
}
export default function ToProgress({
  todo,
  setTodo,
  progress,
  setProgress,
  cards,
  setCards,
  id
}: typeForm) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("progress:", progress)
    handleProgress(id)
  }

  const handleProgress = (id: number) => {
    console.log("id:", id)
    const findTodo = cards.todo.find((t: typeTodo) => t.id == id)
    console.log("findTodo:", findTodo)
    if (findTodo) {
      setProgress([...progress, findTodo])
      setTodo(todo.filter((t: typeTodo) => t.id !== id))
      setCards({
        ...cards,
        todo: cards.todo.filter((t: typeTodo) => t.id !== id),
        progress: [...progress, findTodo]
      })
    }
  }
  return (
    <>
      <form className="pl-2" onSubmit={handleSubmit}>
        <Button type="submit" size="sm" variant="outline">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </>
  )
}
