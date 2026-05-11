import { useState, useCallback, type ReactNode } from 'react';
import { type Todo } from "@/api";
import { FeatureContext } from './FeatureContext';
import { apiEndpoints, getEndpoint } from "@/api";

export const FeatureProvider = ({ children }: { children: ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTodos = useCallback(async () => {
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
    }, [setTodos]);

    const handleDelete = async (todo: Todo) => {
        try {
            await fetch(getEndpoint("todoItems", todo.id), {
                method: 'DELETE'
            });
            fetchTodos();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message); 
            } else {
                console.error('Unknown error', error);
            }
        }
    }

    return (
        <FeatureContext.Provider value={{ todos, setTodos, isLoading, setIsLoading, fetchTodos, handleDelete }}>
            {children}
        </FeatureContext.Provider>
    )
}
