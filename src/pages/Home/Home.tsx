import { useEffect, useState } from "react";
import { apiEndpoints, type Todo } from "@/api"
import { Container } from "@/components/Container"
import { TodoPopover } from "@/pages/About/components/TodoPopover"
import { TodoCard } from "@/pages/Home/TodoCard"

export const Home = () => {

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await fetch(apiEndpoints.todoItems);
            const data = await res.json();
            setTodos(data);
        }

        fetchTodos();
    }, [])

    return (
        <Container>
            <div className="flex items-center">
                <h1 className='font-medium text-2xl mr-4'>Todos</h1>
                <TodoPopover />
            </div>
            {todos.length === 0 ? (
                <div className="text-muted-foreground">No todos yet</div>
            ) : (
                todos.map((todo: Todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))
            )}
        </Container>
    )
}