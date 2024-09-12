import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import AddToDo from "./AddToDo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { ArrowRightIcon, CalendarDaysIcon, ClipboardListIcon, MoreHorizontal } from "lucide-react"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { TypeTodo } from "@/types/Index"
import { motion } from "framer-motion"
import { DeleteToDo } from "./DeleteToDo"
import UpdateToDo from "./UpdateToDo"

export default function ToDoCard() {
  const getToDos = async () => {
    try {
      const res = await api.get("/todos")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries
  const { data: Todos, error } = useQuery<TypeTodo[]>({
    queryKey: ["todos"],
    queryFn: getToDos
  })

  return (
    <>
      <Card className="bg-[#F5F5F5]">
        <CardHeader className=" flex-row">
          <h2 className="text-lg font-semibold mb-4">
            To Do
            <Badge className="ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {Todos?.length}
            </Badge>
          </h2>
          <Button size="icon" className="ml-auto h-8 w-8">
            <span className="w-full ml-2">
              <AddToDo />
            </span>
          </Button>
        </CardHeader>
        <CardContent className="relative">
          <div className="my-2 h-1 w-full bg-[#2563eb] opacity-100 mb-6"></div>
          {Todos?.map((toDo) => (
            <motion.div key={toDo.id}>
              <Card className="w-full max-w-sm mb-5">
                <CardHeader className=" flex-row justify-between">
                  <div>
                    <CardTitle className="text-left">{toDo.title}</CardTitle>
                    <CardDescription className="text-left">{toDo.description}</CardDescription>
                  </div>
                  <div className=" relative bottom-8 left-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DeleteToDo todo={toDo} />

                        <UpdateToDo todo={toDo} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{toDo.createdAt.toString().slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{toDo.endDate.toString().slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardListIcon className="h-4 w-4" />
                      <span>{toDo.status}</span>
                    </div>
                    <Button variant="outline" size="icon">
                      <ArrowRightIcon className="h-4 w-4" />
                      <span className="sr-only">Move to In Progress</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
