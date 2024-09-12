import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { CalendarDaysIcon, ClipboardListIcon, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import api from "@/api"
import { TypeTodo } from "@/types/Index"
import { useQuery } from "@tanstack/react-query"
import { DeleteToDo } from "./DeleteToDo"
import UpdateToDo from "./UpdateToDo"

export default function CompletedCard() {
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

  const getCompletedTodos = Todos?.filter((todo) => todo.status == "Done")

  return (
    <>
      <Card className="bg-[#F5F5F5]">
        <CardHeader className=" flex-row">
          <h2 className="text-lg font-semibold mb-4">
            Completed
            <Badge className="ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8BC48A]">
              {getCompletedTodos?.length}
            </Badge>
          </h2>
        </CardHeader>
        <CardContent className="relative">
          <div className="my-2 h-1 w-full bg-[#8BC48A] opacity-100 mb-6"></div>
          {getCompletedTodos?.map((Completed) => (
            <motion.div key={Completed.id}>
              <Card className="w-full max-w-sm mb-5">
                <CardHeader className=" flex-row justify-between">
                  <div>
                    <CardTitle className="text-left">{Completed.title}</CardTitle>
                    <CardDescription className="text-left">{Completed.description}</CardDescription>
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
                        <DeleteToDo todo={Completed} />

                        <UpdateToDo todo={Completed} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{Completed.createdAt.toString().slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{Completed.endDate.toString().slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardListIcon className="h-4 w-4" />
                      <span>{Completed.status}</span>
                    </div>
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
