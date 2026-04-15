import { atom } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
});
export const toDoList = atom<IToDo[]>({
  key: "TO_DOS",
  default: JSON.parse(localStorage.getItem("toDoList") || "[]"),
});
