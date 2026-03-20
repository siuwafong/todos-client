import { useEffect } from "react";

export const Home = () => {

    const fetchTodos = async () => {
        // const res = await fetch('http://localhost:8080/todoitems')
        const res = await fetch('https://dotnet-todos-production.up.railway.app/todoitems')
        const data = await res.json();
        console.log({ data })
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <>
            <div>Home</div>
        </>
    )
}