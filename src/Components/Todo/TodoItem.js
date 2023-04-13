import { useState } from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo, updataTodo, completedCheck, deleteTodo }) => {
  const [updateMod, setUpdateMod] = useState(false);
  const [inputValue, setInputValue] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.isCompleted);

  /* 제출 클릭 시 */
  const updateHandler = (id, value, isCompleted) => {
    updataTodo(id, value, isCompleted);
    setUpdateMod(false);
  };

  /* 수정모드 켜기 */
  const updateModHandler = () => {
    setUpdateMod(true);
  };
  /* 수정모드 에서 입력한 값 */
  const onchange = (e) => {
    setInputValue(e.target.value);
  };
  /* 수정모드 끄기 및 입력한 내용 초기화 */
  const onCancel = () => {
    setInputValue(todo.todo);
    setUpdateMod(false);
  };

  /* 체크박스 클릭 시 마다 업데이트 */
  const completedHandler = async () => {
    setCompleted((prev) => !prev);
    completedCheck(todo.id, !completed);
  };

  let button = updateMod ? (
    <>
      <button
        data-testid="submit-button"
        type="button"
        onClick={() => updateHandler(todo.id, inputValue, todo.isCompleted)}
      >
        제출
      </button>
      <button data-testid="cancel-button" type="button" onClick={onCancel}>
        취소
      </button>
    </>
  ) : (
    <>
      <button
        data-testid="modify-button"
        type="button"
        onClick={updateModHandler}
      >
        수정
      </button>
      <button
        data-testid="delete-button"
        type="button"
        onClick={() => deleteTodo(todo.id)}
      >
        삭제
      </button>
    </>
  );

  return (
    <div className={styles["list"]}>
      <li>
        <label>
          <input
            type="checkbox"
            onChange={completedHandler}
            checked={completed}
          />
          {updateMod && (
            <input
              data-testid="modify-input"
              type="text"
              value={inputValue}
              onChange={onchange}
            />
          )}
          {!updateMod && <span>{todo.todo}</span>}
        </label>
        <div className={styles["button-box"]}>{button}</div>
      </li>
    </div>
  );
};

export default TodoItem;
