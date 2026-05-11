import { useEffect, useState } from "react";
import { apiEndpoints, type Todo } from "@/api"
import { Container } from "@/components/Container"
import { TodoPopover } from "@/pages/About/components/TodoPopover"
import { TodoCard } from "@/pages/Home/TodoCard"
import { Button } from "@/components/ui/button"
import { CircleX, ChevronLeft, ChevronRight } from "lucide-react"

const PAGE_SIZE = 5;


export const Home = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const fetchTodos = async () => {
        try {
            const res = await fetch(apiEndpoints.todoItems);
            const data = await res.json();
            setTodos(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message); 
            } else {
                console.error('Unknown error', error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleClear = async () => {
        try {
            await fetch(apiEndpoints.todoItems, {
                method: 'DELETE',
            });
            setTodos([]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message); 
            } else {
                console.error('Unknown error', error);
            }
        }
    }

    const totalPages = Math.max(1, Math.ceil(todos.length / PAGE_SIZE));
    const paginated = todos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <Container>
            <div className="flex items-center mb-4">
                <h1 className='font-medium text-2xl mr-4'>Todos</h1>
                <TodoPopover fetchTodos={fetchTodos} />
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
                </>
            )}
            <Button className='cursor-pointer bg-red-600 mt-4' size='lg' onClick={handleClear}>
                <CircleX className="mr-0.5 h-4 w-4" /> Clear
            </Button>
        </Container>
    )
}