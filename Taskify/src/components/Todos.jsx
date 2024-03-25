import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (todoId) => {
    if (editingId === todoId) {
      handleUpdate(todoId);
    } else {
      setEditingId(todoId);
      setEditText(todos.find((todo) => todo.id === todoId).text);
    }
  };

  const handleUpdate = (todoId) => {
    dispatch(updateTodo({ id: todoId, newText: editText }));
    setEditingId(null);
    setEditText("");
  };

  return (
    <>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded-xl"
            key={todo.id}
          >
            {editingId === todo.id ? (
              <input
                className="text-white bg-zinc-800 border-none py-1 px-2 focus:outline-none focus:border-gray-400 rounded"
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}

            <div className="flex">
              <button
                onClick={() => handleEdit(todo.id)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md mr-2"
              >
                {editingId === todo.id ? "Save" : "Edit"}
              </button>

              {/* del btn */}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
