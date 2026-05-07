import { useEffect, useState } from "react";
import { apiEndpoints, type Todo } from "@/api"
import { Container } from "@/components/Container"
import { TodoPopover } from "@/pages/About/components/TodoPopover"
import { TodoCard } from "@/pages/Home/TodoCard"
import { Button } from "@/components/ui/button"
import { CircleX } from "lucide-react"


export const Home = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
                todos.map((todo: Todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))
            )}
                <Button className='cursor-pointer bg-red-600' size='lg' >
                    <CircleX className="mr-0.5 h-4 w-4" /> Clear
                </Button>
        </Container>
    )
}