// OptimisticUpdates.tsx
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function OptimisticUpdates() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false }
  ]);

  const toggleTodo = async (id: number) => {
    // Optimistic update - update UI immediately
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      // Simulate API call
      await fetch(`/api/todos/${id}`, { method: 'PATCH' });
    } catch (error) {
      // Revert on error
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      alert('Failed to update todo');
    }
  };

  const addTodo = async (text: string) => {
    const tempId = Date.now();
    const newTodo = { id: tempId, text, completed: false };
    
    // Add optimistically
    setTodos(prev => [...prev, newTodo]);

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      const savedTodo = await res.json();
      
      // Replace temp todo with real one
      setTodos(prev => prev.map(todo => 
        todo.id === tempId ? savedTodo : todo
      ));
    } catch (error) {
      // Remove on error
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
    }
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        </div>
      ))}
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
    </div>
  );
}