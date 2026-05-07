import { API_BASE_URL } from "./constants";

export type Todo = {
    id: string;
    name: string;
    isComplete: boolean;
}

interface ApiEndpoints {
    todoItems: string;
    todoItem: string;
}

type ApiEndpoint = keyof ApiEndpoints

export const apiEndpoints: ApiEndpoints = {
    todoItems: `${API_BASE_URL}/todoitems`,
    todoItem: `${API_BASE_URL}/todoitem`
} as const;

export const getEndpoint = (route: ApiEndpoint, param?: string) => {
    if (param) {
        return `${apiEndpoints[route]}/${param}`
    } else {
        return apiEndpoints[route]
    }
}

