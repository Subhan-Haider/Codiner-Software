'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });

      if (response.ok) {
        setNewTodo('');
        fetchTodos(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todos.find(t => t.id === id)?.completed }),
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading todos...</div>;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </form>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span
                  className={`${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          {todos.filter(t => t.completed).length} of {todos.length} completed
        </div>
      )}
    </div>
  );
}
