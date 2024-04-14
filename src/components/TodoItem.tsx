import React from "react";
import { useStore } from "../stores/useStore";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  isEditing: boolean;
  onEditChange: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

function TodoItem({
  todo,
  isEditing,
  onEditChange,
  onEdit,
  onCancel,
  onSave,
}: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useStore();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteTodo(todo.id);
    }
  };

  return (
    <li
      className={`flex justify-between items-center bg-gray-100 rounded-md p-2 my-2 ${
        todo.completed ? "line-through opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <input
          value={onEditChange.value}
          onChange={onEditChange.onChange}
          className="border-2 border-gray-300 p-2 flex-1 rounded-md mr-2"
        />
      ) : (
        <span className="flex-1 truncate" onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </span>
      )}

      <span className="flex gap-2">
        {isEditing ? (
          <>
            <button
              className="text-green-500 hover:text-green-700"
              onClick={onSave}
            >
              ✓
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={onCancel}
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              className={`text-gray-500 hover:text-gray-700 ${
                todo.completed ? "hidden" : ""
              }`}
              onClick={onEdit}
            >
              ✏️
            </button>
            <button
              className={`text-red-500 hover:text-red-700 ${
                todo.completed ? "hidden" : ""
              }`}
              onClick={handleDelete}
            >
              🗑️
            </button>
            {todo.completed && (
              <button onClick={() => toggleTodo(todo.id)}>↩️</button>
            )}
          </>
        )}
      </span>
    </li>
  );
}

export default TodoItem;
