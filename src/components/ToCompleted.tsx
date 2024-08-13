import React, { FormEvent } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { typeTodo } from "@/types/Index"
type typeForm = {
  completed: typeTodo[]
  setCompleted: React.Dispatch<React.SetStateAction<typeTodo[]>>
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
export default function ToCompleted({
  completed,
  setCompleted,
  progress,
  setProgress,
  cards,
  setCards,
  id
}: typeForm) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleTodoCompleted(id)
  }

  const handleTodoCompleted = (id: number) => {
    const findProgress = cards.progress.find((p: typeTodo) => p.id == id)
    if (findProgress) {
      setCompleted([...completed, findProgress])
      setProgress(progress.filter((p: typeTodo) => p.id !== id))
      setCards({
        ...cards,
        progress: cards.progress.filter((t: typeTodo) => t.id !== id),
        completed: [...completed, findProgress]
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
