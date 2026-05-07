import { type Todo } from "@/api"

export const TodoCard = ({ todo }: { todo: Todo }) => {
    return (
        <div key={todo.id} className="p-4 border rounded-md mt-3">
            <div>Name: {todo.name}</div>
            <div>Completed: {String(todo.isComplete)}</div>
        </div>
    )
}