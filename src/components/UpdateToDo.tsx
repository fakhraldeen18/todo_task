import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Textarea } from "./ui/textarea"
import { Calendar } from "./ui/calendar"
import { TypeTodo } from "@/types/Index"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { format } from "date-fns"

import api from "@/api"
import { cn } from "@/lib/utils"

export default function UpdateToDo({ todo }: { todo: TypeTodo }) {
  const queryClient = useQueryClient()
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.description,
    status: 0,
    createdAt: todo.createdAt,
    endDate: todo.endDate
  })
  const [createAt, setCreateAt] = useState<Date>(new Date(todo.createdAt))
  const [endDate, setEndDate] = useState<Date>(new Date(todo.endDate))

  const updateTodo = async () => {
    try {
      const res = await api.patch(`/todos/${todo.id}`, updatedTodo)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value
    })
  }
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setUpdatedTodo({
      ...updatedTodo,
      description: value
    })
  }

  const handleCreateAtDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0
      )
      setCreateAt(normalizedDate)
      setUpdatedTodo({
        ...updatedTodo,
        createdAt: normalizedDate // Set the correct property
      })
    }
  }

  const handleEndDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0
      )
      setEndDate(normalizedDate)
      setUpdatedTodo({
        ...updatedTodo,
        endDate: normalizedDate // Set the correct property
      })
    }
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    await updateTodo()
    queryClient.invalidateQueries({ queryKey: ["todos"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className=" w-full flex-row justify-start">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className=" text-center">Update Todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="space-y-6" onSubmit={handleUpdate}>
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
                defaultValue={todo.title}
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
                defaultValue={todo.description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="createdAt">
                create Date
              </Label>
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !createAt && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {createAt ? format(createAt, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={createAt}
                    onSelect={handleCreateAtDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !createAt && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {createAt ? format(createAt, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 pointer-events-auto z-50"
                  align="start"
                  side="bottom"
                  onClick={(e) => e.stopPropagation()} // Stop event bubbling
                >
                  <Calendar mode="single" selected={createAt} onSelect={handleCreateAtDateSelect} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="EndDate">
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
