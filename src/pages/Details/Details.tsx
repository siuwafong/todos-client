import { useParams } from "react-router";
import { getEndpoint, type Todo } from "@/api";
import { useEffect, useState } from "react";

type DetailsParams = {
    id: string;
}

export const Details = () => {

    const [todo, setTodo] = useState<Todo | null>(null);

    const params = useParams<DetailsParams>();

    const todoId = params.id;

    useEffect(() => {
        const fetchTodo = async () => {
            const res = await fetch(getEndpoint("todoItems", todoId));
            const data = await res.json();
            setTodo(data)
        }

        fetchTodo();
    }, [todoId])

    return (
        <div>
            <div>{`this is the page for id ${todoId}`}</div>
            {todo &&
                <div>
                <div>Name: {todo.name}</div>
                <div>Completed: {String(todo.isComplete)}</div>
                </div>
            }
        </div>
    )
}