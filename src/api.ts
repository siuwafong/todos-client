import { API_BASE_URL } from "./constants";

export interface Todo {
    id: string;
    name: string;
    isComplete: boolean;
    createdDate: string
}

export interface FullTodo extends Todo {
    description?: string;
}

interface ApiEndpoints {
    todoItems: string;
    todoItem: string;
    toggleComplete: string;
}

type ApiEndpoint = keyof ApiEndpoints

export const apiEndpoints: ApiEndpoints = {
    todoItems: `${API_BASE_URL}/todoitems`,
    todoItem: `${API_BASE_URL}/todoitem`,
    toggleComplete: `${API_BASE_URL}/complete`
} as const;

export const getEndpoint = (route: ApiEndpoint, param?: string) => {
    if (param) {
        return `${apiEndpoints[route]}/${param}`
    } else {
        return apiEndpoints[route]
    }
}

