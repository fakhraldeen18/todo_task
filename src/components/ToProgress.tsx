import { FormEvent, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRightIcon } from "lucide-react"
import { TypeTodo } from "@/types/Index"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"

export default function ToProgress({ todo }: { todo: TypeTodo }) {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState({
    status: 1
  })
  const updateTodoStatus = async () => {
    try {
      const res = await api.patch(`/todos/updatestatus/${todo.id}`, status)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateTodoStatus()
    queryClient.invalidateQueries({ queryKey: ["todos"] })
  }

  return (
    <>
      <form className="pl-2" onSubmit={handleSubmit}>
        <Button type="submit" size="sm" variant="outline">
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </form>
    </>
  )
}
