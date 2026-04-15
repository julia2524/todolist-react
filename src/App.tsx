import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoList, toDosSelector } from "./atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Title = styled.h1`
  text-align: center;
`;
interface IForm {
  toDo: string;
}

function App() {
  const [category, setCategory] = useRecoilState<Categories>(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoList);
  const categoriedToDos = useRecoilValue(toDosSelector);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo, category };
    setToDos((oldToDos) => [newToDo, ...oldToDos]);
    setValue("toDo", "");
  };
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as Categories);
  };
  const onClick = (id: number, text: string, category: Categories) => {
    setToDos((oldToDos) =>
      oldToDos.map((todo) => (todo.id === id ? { ...todo, category } : todo))
    );
  };
  const onDelete = (id: number) => {
    setToDos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <>
      <Title>{category}</Title>
      <hr />
      <select name="category" onChange={onSelect}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo")} placeholder="Write a to do..." />
        <button>Add</button>
      </form>
      <ul>
        {categoriedToDos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            {todo.category !== Categories.TO_DO && (
              <button
                onClick={() => onClick(todo.id, todo.text, Categories.TO_DO)}
              >
                TO DO
              </button>
            )}
            {todo.category !== Categories.DOING && (
              <button
                onClick={() => onClick(todo.id, todo.text, Categories.DOING)}
              >
                DOING
              </button>
            )}
            {todo.category !== Categories.DONE && (
              <button
                onClick={() => onClick(todo.id, todo.text, Categories.DONE)}
              >
                DONE
              </button>
            )}
            <button onClick={() => onDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
