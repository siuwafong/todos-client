import { type Todo } from "@/api"
import { CircleX } from "lucide-react"
import { getEndpoint } from "@/api"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { useFeatures } from "@/hooks/useFeatures"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import { NavLink } from "react-router";

export const TodoCard = ({ todo, fetchTodos }: { todo: Todo, fetchTodos: () => void }) => {

    const [isComplete, setIsComplete] = useState<boolean>(todo.isComplete);

    const { handleDelete } = useFeatures();

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
            toast("Todo updated", {
                description: `Marked as ${!todo.isComplete ? "complete" : "incomplete"}`,
            })
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
            <div className="flex items-center gap-2">
                <NavLink to={`/todo/${todo.id}`}>
                    <Pencil className="h-5 w-5 cursor-pointer" />
                </NavLink>
                <div onClick={() => handleDelete(todo)}>
                    <CircleX className="h-5 w-5 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}