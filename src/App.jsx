import { useEffect, useState } from 'react'
import { TodoProvider } from './Context'
import TodoItem from './components/TodoItem'
import TodoFrom from './components/TodoFrom'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }])
  }
  const updateTodo = (todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)))
  }
  const deleteTodo = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo))
  }
  const toggleTodo = (todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)))
  }
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todos'))
    if (todoData && todoData.length > 0) {
      setTodos(todoData)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return (
    <TodoProvider value={{ addTodo, updateTodo, deleteTodo, todos, toggleTodo }}>
      <div className="bg-gradient-to-br from-[#172842] via-[#1e293b] to-[#0f172a] min-h-screen py-8 flex flex-col items-center justify-center transition-colors duration-500">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl px-6 py-6 text-white bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 mt-2 tracking-tight text-white drop-shadow-lg select-none">
            <span className="inline-block animate-gradient-x bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Manage Your Todos</span>
          </h1>
          <div className="mb-8">
            {/* Todo form goes here */}
            <TodoFrom />
          </div>
          <div className="flex flex-col gap-y-4 transition-all duration-300">
            {/*Loop and Add TodoItem here */}
            {todos.length === 0 ? (
              <div className="text-center text-gray-300 text-lg animate-fade-in-slow">No todos yet. Add your first task!</div>
            ) : (
              todos.map((todo, idx) => (
                <div
                  key={todo.id}
                  className="w-full group transition-transform duration-300 hover:scale-[1.02] hover:bg-white/5 rounded-lg p-2"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
        {/* Footer Navigation */}
        <footer className="mt-10 text-gray-400 text-sm text-center opacity-80 select-none">
          <nav className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-2">Home</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-2">About</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded px-2">Contact</a>
          </nav>
          <span>&copy; {new Date().getFullYear()} TodoList. All rights reserved.</span>
        </footer>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease-in-out infinite;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </TodoProvider>
  )
}

export default App
