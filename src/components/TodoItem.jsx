import React from 'react'
import { useTodo } from '../Context/TodoContext'
const TodoItem = ({ todo }) => {
    const { toggleTodo, updateTodo, deleteTodo } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoMsg, setTodoMsg] = React.useState(todo.message);

    const toggleCompleted = () => {
        toggleTodo(todo);
    };
    const editTodo = () => {
        if (todoMsg.trim() && todoMsg !== todo.message) {
            updateTodo({ ...todo, message: todoMsg });
        }
        setIsTodoEditable(false);
    };
    React.useEffect(() => {
        setTodoMsg(todo.message);
    }, [todo.message]);

    return (
        <div
            className={`flex items-center border border-white/10 rounded-xl px-4 py-3 gap-x-3 shadow-lg bg-white/20 backdrop-blur-md transition-all duration-300 text-white group hover:scale-[1.01] hover:bg-white/30 animate-fade-in ${
                todo.completed ? 'opacity-60 line-through' : ''
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer accent-green-500 w-5 h-5 focus:ring-2 focus:ring-green-400 transition-all duration-200"
                checked={todo.completed}
                onChange={toggleCompleted}
                aria-label="Toggle completed"
            />
            <input
                type="text"
                className={`flex-1 bg-transparent rounded-lg px-2 py-1 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                    isTodoEditable ? 'border border-blue-300 bg-white/80 text-gray-800' : 'border-none text-white'
                } ${todo.completed ? 'line-through' : ''}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                aria-label="Edit todo"
                maxLength={100}
            />
            <button
                className={`inline-flex w-9 h-9 rounded-lg text-lg border border-white/10 justify-center items-center bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-200 active:scale-95 ml-1 ${todo.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
                aria-label={isTodoEditable ? 'Save todo' : 'Edit todo'}
            >
                {isTodoEditable ? (
                    <span className="transition-transform duration-200">💾</span>
                ) : (
                    <span className="transition-transform duration-200">✏️</span>
                )}
            </button>
            <button
                className="inline-flex w-9 h-9 rounded-lg text-lg border border-white/10 justify-center items-center bg-gradient-to-r from-pink-500/80 to-red-500/80 text-white shadow-md hover:from-pink-600 hover:to-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 transition-all duration-200 active:scale-95 ml-1"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
            >
                <span className="transition-transform duration-200">🗑️</span>
            </button>
        </div>
    );
};

export default TodoItem