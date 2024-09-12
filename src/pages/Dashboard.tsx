import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import {
  ArrowRightIcon,
  BellIcon,
  CalendarDaysIcon,
  CircleUserIcon,
  ClipboardListIcon,
  ClockIcon,
  FilterIcon,
  HomeIcon,
  LineChartIcon,
  MenuIcon,
  MoreHorizontal,
  Package2Icon,
  PackageIcon,
  SearchIcon,
  Share2,
  ShoppingCartIcon,
  UsersIcon
} from "lucide-react"
import { TypeTodo, typeTodo } from "@/types/Index"
import AddToDo from "@/components/AddToDo"
import ToProgress from "@/components/ToProgress"
import BackTodo from "@/components/BackTodo"
import ToCompleted from "@/components/ToCompleted"
import BackToProgress from "@/components/BackToProgress"
import { motion } from "framer-motion"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import ToDoCard from "@/components/ToDoCard"

export default function Dashboard() {
  const [todo, setTodo] = useState<typeTodo[]>([
    { id: 1723467015875, title: "Buy groceries", description: "description" },
    { id: 1223467015875, title: "Read a book", description: "description" },
    { id: 1323467015875, title: "Go for a walk", description: "description" }
  ])

  const [progress, setProgress] = useState<typeTodo[]>([
    { id: 1723467015873, title: "Walk the dog", description: "description" }
  ])
  const [completed, setCompleted] = useState<typeTodo[]>([
    { id: 1723467015883, title: "Refactor codebase", description: "Completed last week" }
  ])

  const [cards, setCards] = useState({
    todo,
    progress,
    completed
  })

  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <PackageIcon className="h-4 w-4" />
                Products{" "}
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </a>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <Package2Icon className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <PackageIcon className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChartIcon className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex text-right">
            <h1 className="text-4xl font-bold">Mobile App</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="mr-3">
                  <Button variant="outline" size="sm" className="h-8 gap-1 p-5">
                    <FilterIcon className="h-4 w-4" />
                    <span className=" text-base">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1 p-5">
                    <ClockIcon className="h-4 w-4" />
                    <span className=" text-base">History</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Order History</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 6 months</DropdownMenuItem>
                  <DropdownMenuItem>All time</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex text-right">
              <Button variant="outline" size="sm" className="h-8 gap-1 p-5">
                <Share2 className="h-4 w-4" />
                <span className=" text-base">Share</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           <ToDoCard/>
            <Card className="bg-[#F5F5F5]">
              <CardHeader className=" flex-row">
                <h2 className="text-lg font-semibold mb-4">
                  In Progress
                  <Badge className="ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFA500]">
                    {cards.progress.length}
                  </Badge>
                </h2>
              </CardHeader>
              <CardContent>
                <div className="my-0.5 h-0.5 w-full   bg-[#FFA500] opacity-100 -mt-5 mb-8"></div>
                {cards.progress.map((p) => (
                  <ul key={p.id} className="space-y-2">
                    <motion.li
                      layout
                      layoutId={p.id.toString()}
                      className="bg-background rounded-md p-2 flex items-center justify-between mb-2"
                    >
                      <div>
                        <h3 className="font-medium">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      <div className="flex items-center justify-between ">
                        <BackTodo
                          todo={todo}
                          setTodo={setTodo}
                          progress={progress}
                          setProgress={setProgress}
                          id={p.id}
                          cards={cards}
                          setCards={setCards}
                        />

                        <ToCompleted
                          progress={progress}
                          setProgress={setProgress}
                          completed={completed}
                          setCompleted={setCompleted}
                          cards={cards}
                          setCards={setCards}
                          id={p.id}
                        />
                      </div>
                    </motion.li>
                  </ul>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-[#F5F5F5]">
              <CardHeader className=" flex-row">
                <h2 className="text-lg font-semibold mb-4">
                  Completed
                  <Badge className="ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8BC48A]">
                    {cards.completed.length}
                  </Badge>
                </h2>
              </CardHeader>
              <CardContent>
                <div className="my-0.5 h-0.5 w-full   bg-[#8BC48A] opacity-100 -mt-5 mb-8"></div>
                {cards.completed.map((c) => (
                  <ul key={c.id} className="space-y-2">
                    <motion.li
                      layout
                      layoutId={c.id.toString()}
                      className="bg-background rounded-md p-2 flex items-center justify-between mb-2"
                    >
                      <div>
                        <h3 className="font-medium">{c.title}</h3>
                        <p className="text-sm text-muted-foreground">{c.description}</p>
                      </div>
                      <BackToProgress
                        progress={progress}
                        setProgress={setProgress}
                        completed={completed}
                        setCompleted={setCompleted}
                        cards={cards}
                        setCards={setCards}
                        id={c.id}
                      />
                    </motion.li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
