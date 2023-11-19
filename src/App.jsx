import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

export default function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? []
  );
  const todoRef = useRef(0);
  const dateRef = useRef(0);

  const addToDo = () => {
    let todo = todoRef.current.value.trim();
    let date = dateRef.current.value;
    if (todo === "" || date === "") return alert("Please fill in all fields!");
    if (new Date(date) - Date.now() < 0)
      return alert("Old dated content cannot be added!");
    setTodos((x) => [
      {
        id: uuidv4(),
        title: todo,
        date: date,
        isDone: false,
      },
      ...x,
    ]);
  };

  const deleteToDo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const isDone = (id) => {
    let newArray = [];
    todos.forEach((todo) => {
      if (todo.id === id) todo.isDone = !todo.isDone;
      newArray.push(todo);
    });
    setTodos(newArray);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    todoRef.current.value = "";
    dateRef.current.value = "";
  }, [todos]);

  return (
    <div className="m-10">
      <div className="flex flex-col items-center justify-center w-full space-y-5">
        <h1 className="font-semibold md:text-4xl">To do App</h1>
        <input
          ref={todoRef}
          className="border border-black rounded px-5 py-2 w-full md:w-1/2 duration-500"
          type="text"
          placeholder="Add To do"
        />

        <input
          ref={dateRef}
          type="datetime-local"
          className="border border-black rounded px-5 py-2 w-full md:w-1/2 duration-500"
        />
        <button
          onClick={addToDo}
          className="border bg-black text-white hover:bg-white hover:border-black hover:text-black rounded px-5 py-2 w-full md:w-1/2 duration-500"
        >
          Add To Do
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-5">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={classNames(
              "bg-black text-white rounded p-5 duration-500",
              {
                "bg-black/50": todo.isDone,
              }
            )}
          >
            <div className="flex flex-col items-center text-center space-y-5">
              <div
                className={classNames("font-semibold text-xl", {
                  "line-through italic text-black/50": todo.isDone,
                })}
              >
                <h1>{todo.title}</h1>
                <h2>{new Date(todo.date).toDateString()}</h2>
                <h3>
                  {(
                    (new Date(todo.date) - Date.now()) /
                    (1000 * 60 * 60)
                  ).toFixed()}
                  <span className="ml-2">Hours Left</span>
                </h3>
              </div>
              <div className="flex flex-col items-center gap-y-5">
                <button
                  onClick={() => isDone(todo.id)}
                  className="border border-white rounded px-5 py-2 duration-500"
                >
                  Is Done
                </button>
                <button
                  onClick={() => deleteToDo(todo.id)}
                  className="bg-red-700 rounded px-5 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
