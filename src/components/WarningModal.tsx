

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { CircleX } from "lucide-react"

export const WarningModal = ({ onConfirm, onCancel, title, description, onClick }: { onConfirm: () => void; onCancel: () => void, title: string, description: string, onClick: () => void }) => {
    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer bg-red-600 mt-4' size='lg' onClick={onClick}>
                        <CircleX className="mr-0.5 h-4 w-4" /> Clear
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                        {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={onCancel} variant="outline">Cancel</Button>
                </DialogClose>      
                <DialogClose asChild>                 
                    <Button variant="destructive" onClick={onConfirm}>Save changes</Button>
                </DialogClose>
                </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}