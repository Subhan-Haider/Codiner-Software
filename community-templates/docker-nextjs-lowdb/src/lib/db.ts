import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Define the database schema
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface DatabaseSchema {
  todos: Todo[];
  users: User[];
}

// Create database instance
const adapter = new JSONFile<DatabaseSchema>('db.json');
const db = new Low<DatabaseSchema>(adapter, { todos: [], users: [] });

// Initialize database
export async function initDb() {
  await db.read();
  return db;
}

// Get database instance
export { db };

// Helper functions for common operations
export const dbHelpers = {
  // Todos
  async getTodos(): Promise<Todo[]> {
    await db.read();
    return db.data.todos;
  },

  async addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
    await db.read();
    const newTodo: Todo = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...todo,
    };
    db.data.todos.push(newTodo);
    await db.write();
    return newTodo;
  },

  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo | null> {
    await db.read();
    const todoIndex = db.data.todos.findIndex(t => t.id === id);
    if (todoIndex === -1) return null;

    db.data.todos[todoIndex] = { ...db.data.todos[todoIndex], ...updates };
    await db.write();
    return db.data.todos[todoIndex];
  },

  async deleteTodo(id: string): Promise<boolean> {
    await db.read();
    const initialLength = db.data.todos.length;
    db.data.todos = db.data.todos.filter(t => t.id !== id);
    await db.write();
    return db.data.todos.length < initialLength;
  },

  // Users
  async getUsers(): Promise<User[]> {
    await db.read();
    return db.data.users;
  },

  async addUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await db.read();
    const newUser: User = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...user,
    };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },
};
