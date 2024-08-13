import React, { FormEvent } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
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
export default function BackToProgress({
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
    console.log("progress:", progress)
    handleBackToProgress(id)
  }

  const handleBackToProgress = (id: number) => {
    console.log("id:", id)
    const findCompleted = cards.completed.find((t: typeTodo) => t.id == id)
    console.log("findCompleted:", findCompleted)
    if (findCompleted) {
      setProgress([...progress, findCompleted])
      setCompleted(completed.filter((t: typeTodo) => t.id !== id))
      setCards({
        ...cards,
        progress: [...progress, findCompleted],
        completed: cards.completed.filter((t: typeTodo) => t.id !== id)
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
