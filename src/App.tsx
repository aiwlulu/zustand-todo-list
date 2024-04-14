import React, { useState } from "react";
import { useStore } from "./stores/useStore";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [edit, setEdit] = useState<{ id: string; text: string } | null>(null);
  const { todos, editTodo } = useStore();

  const handleEdit = (todoId: string, currentText: string) => {
    setEdit({ id: todoId, text: currentText });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (edit) {
      setEdit({ ...edit, text: e.target.value });
    }
  };

  const handleEditSave = () => {
    if (edit && edit.text.trim() !== "") {
      editTodo(edit.id, edit.text.trim());
      setEdit(null);
    }
  };

  const handleEditCancel = () => {
    setEdit(null);
  };

  return (
    <div className="App max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To Do List</h1>
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={edit?.id === todo.id}
            onEditChange={{
              value: edit?.text || "",
              onChange: handleEditChange,
            }}
            onEdit={() => handleEdit(todo.id, todo.text)}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
