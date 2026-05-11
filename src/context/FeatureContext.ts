import { createContext, type Dispatch, type SetStateAction } from 'react';
import { type Todo } from "@/api";

type FeatureContextType = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    fetchTodos: () => Promise<void>;
    handleDelete: (todo: Todo) => Promise<void>;
}

export const FeatureContext = createContext<FeatureContextType | null>(null);
