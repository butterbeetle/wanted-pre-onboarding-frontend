import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Todo.module.css";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  /* Todo 생성 */
  const createTodo = async (e) => {
    e.preventDefault();
    const todo = inputRef.current.value;
    const res = await fetch(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          todo,
        }),
      }
    );
    inputRef.current.value = "";
    const body = await res.json();

    setTodos((prev) => {
      return [...prev, body];
    });
  };

  /* Todo 가져오기 */
  const getTodos = async () => {
    const res = await fetch(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const body = await res.json();
    setTodos(body);
  };

  /* Todo 수정 시 */
  const updataTodo = async (id, todo, isCompleted) => {
    const res = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          todo,
          isCompleted,
        }),
      }
    );
    const body = await res.json();

    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) return body;
        return item;
      })
    );
  };

  /* Todo checkbox 클릭 시 */
  const completedCheck = async (id, checked) => {
    let todoStr = "";
    todos.forEach((todo) => {
      if (todo.id === id) todoStr = todo.todo;
    });

    const res = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          todo: todoStr,
          isCompleted: checked,
        }),
      }
    );
    const body = await res.json();

    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) return body;
        return item;
      })
    );
  };

  /* Todo 삭제 */
  const deleteTodo = async (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
    return await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  };

  /* 첫 접속 시 Todo 가져오기 */
  useLayoutEffect(() => {
    if (localStorage.getItem("access_token")) getTodos();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/signin");
  }, [navigate]);

  return (
    <main>
      <div>
        <form>
          <input ref={inputRef} data-testid="new-todo-input" />
          <button
            onClick={createTodo}
            type="submit"
            data-testid="new-todo-add-button"
          >
            추가
          </button>
        </form>
      </div>
      <div>
        <ul>
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                updataTodo={updataTodo}
                completedCheck={completedCheck}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Todo;
