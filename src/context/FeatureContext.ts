import { createContext } from 'react';
import { type Todo } from "@/api";

export const FeatureContext = createContext({ 
    todos: [] as Todo[], 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTodos: (todos: Todo[]) => {}, 
    isLoading: true, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsLoading: (loading: boolean) => {}, 
    fetchTodos: async () => {}, 
    handleDelete: async (todo: Todo) => {} 
});
