import React from 'react'
import { useTodo } from '../Context/TodoContext'
const TodoFrom = () => {
    const [todo, setTodo] = React.useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return
        addTodo({ message: todo, completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex w-full gap-2 items-center animate-fade-in">
            <input
                type="text"
                placeholder="Write a new todo..."
                className="flex-1 border-none rounded-lg px-4 py-2 bg-white/80 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition-all duration-200"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                aria-label="Todo input"
                maxLength={100}
                autoFocus
            />
            <button
                type="submit"
                className="rounded-lg px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition-all duration-200 active:scale-95"
                aria-label="Add todo"
            >
                <span className="hidden sm:inline">Add</span>
                <span className="sm:hidden">＋</span>
            </button>
        </form>
    )
}

export default TodoFrom