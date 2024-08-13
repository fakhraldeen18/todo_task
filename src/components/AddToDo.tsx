import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { PlusCircle } from "lucide-react"
import { typeTodo } from "@/types/Index"
type typeAddTodo = {
  todo: typeTodo[]
  setTodo: React.Dispatch<React.SetStateAction<typeTodo[]>>
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
}
export default function AddToDo({ todo, setTodo, cards, setCards }: typeAddTodo) {
  const [newTodo, setNewTodo] = useState({
    id: 0,
    title: "",
    description: ""
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("newTodo:", newTodo)
    setCards({
      ...cards,
      todo: [...todo, newTodo]
    })
    setTodo([...todo, newTodo])
    // console.log('todo:', todo)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTodo({ ...newTodo, [name]: value, id: +new Date() })
  }
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setNewTodo({
      ...newTodo,
      description: value
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <PlusCircle className="h-3.5 w-3.5" />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className=" text-center">Add New Todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="title">
                Title
              </Label>
              <Input
                name="title"
                id="title"
                placeholder="Enter the Todo title"
                type="text"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="description">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Enter Todo description"
                rows={4}
                className="col-span-3 h-40rounded-lg"
                onChange={handleChangeTextArea}
              />
            </div>
            <div className="flex justify-between ">
              <DialogClose asChild>
                <Button className="w-1/2 mr-5" type="submit">
                  Save Product
                </Button>
              </DialogClose>
              <Button className="w-1/2" variant="outline" type="reset">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
