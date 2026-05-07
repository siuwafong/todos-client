import { type Todo } from "@/api"
import { CircleX } from "lucide-react"
import { getEndpoint } from "@/api"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export const TodoCard = ({ todo, fetchTodos }: { todo: Todo, fetchTodos: () => void }) => {

    const [isComplete, setIsComplete] = useState<boolean>(todo.isComplete);

    const handleDelete = async () => {
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

    const toggleComplete = async () => {
        try {
            await fetch(getEndpoint("todoItems", todo.id), {
                method: 'PUT',
                body: JSON.stringify({
                    Name: todo.name,
                    IsComplete: !todo.isComplete
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            fetchTodos();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unknown error', error);
            }
        }
    }

    return (
        <div key={todo.id} className="p-4 border rounded-md mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Checkbox
                    checked={isComplete}
                    onCheckedChange={() => {
                        setIsComplete(prev => !prev);
                        toggleComplete();
                    }}
                />
                <div>{todo.name}</div>
            </div>
            <div onClick={handleDelete}>
                <CircleX className="h-5 w-5 cursor-pointer" />
            </div>
        </div>
    )
}