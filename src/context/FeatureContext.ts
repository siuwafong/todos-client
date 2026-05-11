import { createContext } from 'react';
import { type Todo } from "@/api";

export const FeatureContext = createContext({ 
    todos: [] as Todo[], 
    setTodos: (todos: Todo[]) => todos, 
    isLoading: true, 
    setIsLoading: (loading: boolean) => loading, 
    fetchTodos: async () => {}, 
    handleDelete: async (todo: Todo) => todo 
});
