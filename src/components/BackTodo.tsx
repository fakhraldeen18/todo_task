import React, { FormEvent } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
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
export default function BackTodo({
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
    handleBackTodo(id)
  }

  const handleBackTodo = (id: number) => {
    console.log("id:", id)
    const findProgress = cards.progress.find((t: typeTodo) => t.id == id)
    console.log("findProgress:", findProgress)
    if (findProgress) {
      setTodo([...todo, findProgress])
      setProgress(progress.filter((t: typeTodo) => t.id !== id))
      setCards({
        ...cards,
        todo: [...todo, findProgress],
        progress: cards.progress.filter((t: typeTodo) => t.id !== id)
      })
    }
  }
  return (
    <>
      <form className="pl-2" onSubmit={handleSubmit}>
        <Button type="submit" size="sm" variant="outline">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </form>
    </>
  )
}
