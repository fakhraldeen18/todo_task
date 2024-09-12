import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { TypeTodo } from "@/types/Index"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteToDo({ todo }: { todo: TypeTodo }) {
  const queryClient = useQueryClient()
  const deleteTodo = async (id: string) => {
    try {
      const res = await api.delete(`/todos/${id}`)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id)
    queryClient.invalidateQueries({ queryKey: ["todos"] })

  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className=" w-full flex-row justify-start">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Todo ?</DialogTitle>
          <DialogDescription>Are you sure you want delete?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={() => handleDeleteTodo(todo.id)}>
            Delete item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
