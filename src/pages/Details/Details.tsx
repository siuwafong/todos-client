import { useParams } from "react-router";
import { getEndpoint, type FullTodo } from "@/api";
import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import { toast } from "sonner"

type DetailsParams = {
    id: string;
}

export const Details = () => {

    const [todo, setTodo] = useState<FullTodo | null>(null);
    const [initialTodo, setInitialTodo] = useState<FullTodo | null>(todo);

    const params = useParams<DetailsParams>();
    const todoId = params.id;

    useEffect(() => {
        const fetchTodo = async () => {
            const res = await fetch(getEndpoint("todoItems", todoId));
            const data = await res.json();
            setInitialTodo(data);
            setTodo(data)
        }

        fetchTodo();
    }, [todoId])

    const handleUpdate = async () => {
        const todoToUpdate = JSON.stringify({
            Name: todo?.name,
            IsComplete: todo?.isComplete,
            Description: todo?.description
        });
        const res = await fetch(getEndpoint("todoItems", todoId), {
            method: 'PUT',
            body: todoToUpdate,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('showing toast')
        toast("Todo updated", {
            description: `Todo was successfully updated!`,
        })        
        const data = await res.json();
        setInitialTodo(data);
        setTodo(data);
    }

    const hasChanges = useMemo(() => {
        return JSON.stringify(todo) !== JSON.stringify(initialTodo);
    }, [todo, initialTodo]);

    const handleRevert = () => {
        setTodo(initialTodo);
    }

    return (
        <div className="m-4">
            {todo &&
                <div>
                    <Field>
                        <div className="flex items-center mb-2">
                            <FieldLabel htmlFor="todo-name" className="mr-3">Name: </FieldLabel>
                            <Input 
                                value={todo.name}
                                id="todo-name" 
                                placeholder="Type your todo name here."
                                onChange={(e) => setTodo(prev => prev ? { ...prev, name: e.target.value } : prev)}
                                className="w-100"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="flex items-center mb-2">
                            <FieldLabel htmlFor="checkbox-iscomplete" className="mr-3">Completed: </FieldLabel>
                            <Checkbox
                                checked={todo.isComplete}
                                onCheckedChange={() => {
                                    setTodo(prev => prev ? { ...prev, isComplete: !prev.isComplete } : prev);
                                }}
                            />
                        </div>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
                        <FieldDescription>Add or edit the description of the todo below.</FieldDescription>
                        <Textarea 
                            value={todo.description || ''}
                            id="todo-description" 
                            placeholder="Type your description here." 
                            onChange={(e) => setTodo(prev => prev ? { ...prev, description: e.target.value } : prev)}
                            className="w-100"
                        />
                    </Field>
                    <div>
                        <Button 
                            className='cursor-pointer bg-blue-600 mt-4 mr-2' 
                            size='lg' 
                            onClick={handleUpdate}
                            disabled={!todo.name.trim() || !hasChanges}
                        >
                            <Save className="mr-0.5 h-4 w-4" /> Save
                        </Button>
                                                <Button 
                            className='cursor-pointer bg-red-600 mt-4' 
                            size='lg' 
                            onClick={handleRevert}
                            disabled={ !hasChanges}
                        >
                            <RotateCcw className="mr-0.5 h-4 w-4" /> Revert
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}