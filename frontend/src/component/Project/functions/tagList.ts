import uuid from "react-uuid";
import { ContentInterface } from "../context/PageContext";

const list = [
  {
    //기본
    id: uuid(),
    tag: "div",
    text: "",
  },
  {
    //페이지
    id: uuid(),
    tag: "div",
    text: "",
  },
  {
    //제목1
    id: uuid(),
    tag: "h1",
    text: "",
  },
  {
    //제목2
    id: uuid(),
    tag: "h3",
    text: "",
  },
  {
    //할일목록
    id: uuid(),
    tag: "div",
    text: "",
  },
  {
    //구분선
    id: uuid(),
    tag: "hr",
    text: "",
  },
];

export function getTagContent(num: number): ContentInterface {
  return list[num];
}
