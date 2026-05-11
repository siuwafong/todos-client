import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { apiEndpoints } from "@/api"
import { toast } from "sonner"
import { format } from 'date-fns';
import { useFeatures } from "@/hooks/useFeatures"

export const TodoPopover = ({ setPage, pageSize }: { setPage: Dispatch<SetStateAction<number>>, pageSize: number }) => {

    const { fetchTodos, handleDelete, todos } = useFeatures();

    const [todoName, setTodoName] = useState<string>('');
    const [error, setError] = useState<string | false>(false);

    const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTodo = e.target.value;
        if (newTodo.length > 50) {
            setError('Todo must be at most 50 characters long');
        } else {
            setError(false);
        }
        setTodoName(newTodo);
    }

    const handleClick = async () => {
        try {
            const res = await fetch(apiEndpoints.todoItems, {
                method: 'POST',
                body: JSON.stringify({
                    Name: todoName,
                    IsComplete: false
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const newTodo = await res.json();
            setTodoName('')
            fetchTodos();

            const formatted = format(new Date(), 'MMMM d, h:mma');

            toast("Todo added", {
                description: `Created at ${formatted}`,
                action: {
                    label: "Undo",
                    onClick: () => handleDelete(newTodo),
                },
            })
            setPage(Math.floor(todos.length / pageSize) + 1);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message); 
            } else {
                console.error('Unknown error', error);
            }        
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='cursor-pointer bg-blue-600' size='lg' >
                    <CirclePlus className="mr-0.5 h-4 w-4" /> Add
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <PopoverHeader>
                    <PopoverTitle>Add Todo</PopoverTitle>
                    <PopoverDescription>
                        Add a new todo!
                    </PopoverDescription>
                </PopoverHeader>
                <FieldGroup>
                    <Field data-invalid={!!error}>
                        <Input
                            placeholder="Todo..."
                            className="mt-2"
                            aria-invalid={!!error}
                            value={todoName}
                            onChange={handleTodoChange}
                        />
                        {error && (
                            <FieldError>
                                {error}
                            </FieldError>
                        )}
                        <Button 
                            className='bg-blue-600 cursor-pointer' 
                            onClick={handleClick}
                            disabled={!!error || todoName.length === 0}
                        >
                            Add
                        </Button>
                    </Field>
                </FieldGroup>
            </PopoverContent>
        </Popover>
    )
}