import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"
export default function AddToDo() {
  const [createAt, setCreateAt] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [newTodo, setNewTodo] = useState({
    userId: "53e3f50e-36c9-468e-85e2-b6983fef224e",
    title: "",
    description: "",
    status: 0,
    createdAt: format(createAt, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd")
  })
  const queryClient = useQueryClient()

  const handleCreateAtDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Normalize the date by setting it to midday to avoid timezone issues
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0 // Set time to noon to avoid timezone issues
      )
      setCreateAt(normalizedDate)
      setNewTodo({
        ...newTodo,
        createdAt: format(normalizedDate, "yyyy-MM-dd")
      })
    }
  }
  const handleEndDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Normalize the date by setting it to midday to avoid timezone issues
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0 // Set time to noon to avoid timezone issues
      )
      setEndDate(normalizedDate)
      setNewTodo({
        ...newTodo,
        endDate: format(normalizedDate, "yyyy-MM-dd")
      })
    }
  }
  const AddToDos = async () => {
    try {
      const res = await api.post("/todos", newTodo)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await AddToDos()
    console.log("newTodo:", newTodo)
    queryClient.invalidateQueries({ queryKey: ["todos"] })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTodo({ ...newTodo, [name]: value })
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="createdAt">
                create Date
              </Label>
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
                <PopoverContent className="w-auto p-0 pointer-events-auto z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={createAt}
                    onSelect={handleCreateAtDateSelect}
                    initialFocus
                  />
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
