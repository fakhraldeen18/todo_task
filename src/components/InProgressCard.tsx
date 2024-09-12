import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ArrowRightIcon, CalendarDaysIcon, ClipboardListIcon, MoreHorizontal } from 'lucide-react'
import { motion } from "framer-motion"
import api from '@/api'
import { TypeTodo } from '@/types/Index'
import { useQuery } from '@tanstack/react-query'
import { DeleteToDo } from './DeleteToDo'
import UpdateToDo from './UpdateToDo'


export default function InProgressCard() {
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

  const getInProgressTodos = Todos?.filter((todo) => todo.status == "InProgress")
  
  return (
    <>
      <Card className="bg-[#F5F5F5]">
        <CardHeader className=" flex-row">
          <h2 className="text-lg font-semibold mb-4">
            In Progress
            <Badge className="ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFA500]">
              {getInProgressTodos?.length}
            </Badge>
          </h2>
        </CardHeader>
        <CardContent className="relative">
          <div className="my-2 h-1 w-full bg-[#FFA500] opacity-100 mb-6"></div>
          {getInProgressTodos?.map((inProg) => (
            <motion.div key={inProg.id}>
              <Card className="w-full max-w-sm mb-5">
                <CardHeader className=" flex-row justify-between">
                  <div>
                    <CardTitle className="text-left">{inProg.title}</CardTitle>
                    <CardDescription className="text-left">{inProg.description}</CardDescription>
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
                        <DeleteToDo todo={inProg} />

                        <UpdateToDo todo={inProg} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{inProg.createdAt.toString().slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{inProg.endDate.toString().slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardListIcon className="h-4 w-4" />
                      <span>{inProg.status}</span>
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
