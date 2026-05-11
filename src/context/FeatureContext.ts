import { createContext } from 'react';
import { type Todo } from "@/api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FeatureContext = createContext({ 
    todos: [] as Todo[], 
    setTodos: (todos: Todo[]) => {}, 
    isLoading: true, 
    setIsLoading: (loading: boolean) => {}, 
    fetchTodos: async () => {}, 
    handleDelete: async (todo: Todo) => {} 
});
