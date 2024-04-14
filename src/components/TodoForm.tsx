import { useState } from "react";
import { useStore } from "../stores/useStore";

function TodoForm() {
  const [text, setText] = useState("");
  const { addTodo } = useStore();

  const handleAddClick = () => {
    if (text.trim() !== "") {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border-2 border-gray-300 p-2 flex-1 rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Please write something ..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddClick}
      >
        Add +
      </button>
    </div>
  );
}

export default TodoForm;
