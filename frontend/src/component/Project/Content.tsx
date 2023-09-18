import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CaretContext,
  ContentInterface,
  EditableContext,
  PageContext,
} from "./context/PageContext";
import {
  getCaretPosition,
  setCaretClick,
  setCaretPosition,
} from "./functions/caret";
import { updateContent, updateText } from "./functions/firebaseCRUD";
import "../../css/ProjectContents.css";
import { addContents, removeContents } from "./functions/contents";
import {
  addEditable,
  downwardEditable,
  removeEditable,
  setFalseEditable,
  setTrueEditable,
  upwardEditable,
} from "./functions/editable";

const Content = ({
  index,
  element,
}: {
  index: number;
  element: ContentInterface;
}) => {
  const pageContext = useContext(PageContext);
  const editableContext = useContext(EditableContext);
  const caretContext = useContext(CaretContext);
  if (!pageContext || !editableContext || !caretContext) {
    throw new Error("Context must be used within a PageProvider");
  }
  const contents = pageContext.contents.contents;
  const { editable, setEditable } = editableContext;
  const { caret, setCaret } = caretContext;
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editable[index] || tagRef.current === null) return;

    if (clickPosition.x === 0 && clickPosition.y === 0) {
      tagRef.current.focus();
      setCaretPosition(caret);
    } else {
      setCaretClick(tagRef, clickPosition);
      setClickPosition({ x: 0, y: 0 });
    }
  }, [editable[index]]);

  const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    updateText(
      `projects/12345/pageList/0/contents/${index}`,
      e.target.innerText
    );
  };

  const onFocus = () => {
    if (tagRef.current === null) return;
    tagRef.current.innerText = element.text;
  };

  const onBlur = () => {
    setEditable(setFalseEditable(editable, index));
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditable(setTrueEditable(editable, index));
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const sel = document.getSelection();
    switch (e.keyCode) {
      case 13: // "Enter"
        e.preventDefault();
        updateContent(
          "projects/12345/pageList/0",
          addContents(contents, index)
        );
        setEditable(addEditable(editable, index));
        break;
      case 8: // "Backspace"
        if (sel?.anchorOffset === 0 && index !== 0) {
          e.preventDefault();
          updateContent(
            "projects/12345/pageList/0",
            removeContents(contents, index)
          );
          setEditable(removeEditable(editable, index));
          setCaret(31415928979);
        }
        break;
      case 38: // "윗방향 화살표"
        e.preventDefault();
        setEditable(upwardEditable(editable, index));
        setCaret(getCaretPosition());
        break;
      case 40: // "아랫방향 화살표"
        e.preventDefault();
        setEditable(downwardEditable(editable, index));
        setCaret(getCaretPosition());
        break;
    }
  };

  const editableTag = () => {
    return (
      <div className="text-block-container">
        <div
          className="text-block"
          style={{
            display: editable[index] ? "block" : "none",
          }}
          placeholder="명령어 사용시 'F8'을 입력하세요"
          ref={tagRef}
          contentEditable={true}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        ></div>
        <div
          className="text-block"
          style={{
            display: editable[index] ? "none" : "block",
          }}
          onClick={onClick}
        >
          {element.text}
        </div>
      </div>
    );
  };
  switch (element.tag) {
    case "div":
      return <div>{editableTag()}</div>;
    case "h2":
      return <h2>{editableTag()}</h2>;
    case "h3":
      return <h3>{editableTag()}</h3>;
    case "h4":
      return <h4>{editableTag()}</h4>;
    default:
      return <div>{editableTag()}</div>;
  }
};

export default Content;
