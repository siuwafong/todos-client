import { useEffect, useState } from "react";
import { apiEndpoints, type Todo } from "@/api"
import { Container } from "@/components/Container"
import { TodoPopover } from "@/pages/About/components/TodoPopover"
import { TodoCard } from "@/pages/Home/TodoCard"
import { Button } from "@/components/ui/button"
import { CircleX, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useFeatures } from "@/hooks/useFeatures"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Order = "asc" | "desc";

export const Home = () => {

    const PAGE_SIZE = 5;

    const { todos, setTodos, isLoading, fetchTodos } = useFeatures();
    const [page, setPage] = useState<number>(1);
    const [order, setOrder] = useState<Order>("asc");
    const [viewableTodos, setViewableTodos] = useState<"all" | "completed" | "incomplete">("all");

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos])

    const handleClear = async () => {
        try {
            await fetch(apiEndpoints.todoItems, {
                method: 'DELETE',
            });
            toast("All todos cleared");
            setTodos([]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message); 
            } else {
                console.error('Unknown error', error);
            }
        }
    }

    const updateOrder = (newOrder: Order) => {
        setOrder(newOrder);
        setPage(1);
        const sorted = [...todos].sort((a: Todo, b: Todo) => {
            if (newOrder === "asc") {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
            } else {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            }
        });
        setTodos(sorted);
    }

    const updateFilter = (filter: "completed" | "incomplete") => {
        setPage(1);
        setViewableTodos(filter);
    }

    const todosToView = viewableTodos === "all" ? todos : viewableTodos === "completed" ? todos.filter((t: Todo) => t.isComplete) : todos.filter((t: Todo) => !t.isComplete);
    const totalPages = Math.max(1, Math.ceil(todosToView.length / PAGE_SIZE));
    const paginated = todosToView.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


    return (
        <Container>
            <div className="flex items-center mb-4 justify-between w-full">
                <div className="flex items-center">
                    <h1 className='font-medium text-2xl mr-4'>Todos</h1>
                    <TodoPopover setPage={setPage} pageSize={PAGE_SIZE} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort and Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center justify-between" onSelect={() => updateOrder("asc")}>
                                <div>Ascending</div>
                                <div>{order === 'asc' ? <Check className="h-4 w-4"/> : ""}</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center justify-between" onSelect={() => updateOrder("desc")}>
                                <div>Descending</div>
                                <div>{order === 'desc' ? <Check className="h-4 w-4"/> : ""}</div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Filter</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center justify-between" onSelect={() => updateFilter("all")}>
                                <div>All</div>
                                <div>{viewableTodos === "all" ? <Check className="h-4 w-4"/> : ""}</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center justify-between" onSelect={() => updateFilter("completed")}>
                                <div>Completed</div>
                                <div>{viewableTodos === "completed" ? <Check className="h-4 w-4"/> : ""}</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center justify-between" onSelect={() => updateFilter("incomplete")}>
                                <div>Incomplete</div>
                                <div>{viewableTodos === "incomplete" ? <Check className="h-4 w-4"/> : ""}</div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {isLoading ? (
                <div className="text-muted-foreground">Loading...</div>
            ) : todos.length === 0 ? (
                <div className="text-muted-foreground">No todos yet</div>
            ) : (
                <>
                    {paginated.map((todo: Todo) => (
                        <TodoCard key={todo.id} todo={todo} fetchTodos={fetchTodos} />
                    ))}
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                {page} / {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="cursor-pointer"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            )}
            <Button className='cursor-pointer bg-red-600 mt-4' size='lg' onClick={handleClear}>
                <CircleX className="mr-0.5 h-4 w-4" /> Clear
            </Button>
        </Container>
    )
}