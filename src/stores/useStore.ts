import create from "zustand";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
};

export const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: uuidv4(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),
}));
