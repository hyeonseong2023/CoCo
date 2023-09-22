import React, { useContext, useEffect, useRef, useState } from "react";
import { updateContent, updateText } from "./functions/firebaseCRUD";
import {
  CaretContext,
  EditableContext,
  HeadEditableContext,
  PageContext,
  initialContent,
} from "./context/PageContext";
import {
  getCaretPosition,
  setCaretClick,
  setCaretPosition,
} from "./functions/caret";
import "../../css/ProjectContents.css";
import { addEditable, downwardEditable } from "./functions/editable";
import { addContents } from "./functions/contents";

const Head = () => {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const headRef = useRef<HTMLHeadingElement>(null);
  const pageContext = useContext(PageContext);
  const headEditableContext = useContext(HeadEditableContext);
  const editableContext = useContext(EditableContext);
  const caretContext = useContext(CaretContext);
  if (
    !pageContext ||
    !headEditableContext ||
    !caretContext ||
    !editableContext
  ) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const contents = pageContext.contents;
  const { headEditable, setHeadEditable } = headEditableContext;
  const { editable, setEditable } = editableContext;
  const { caret, setCaret } = caretContext;

  useEffect(() => {
    if (!headEditable || headRef.current === null) return;
    if (clickPosition.x === 0 && clickPosition.y === 0) {
      headRef.current.focus();
      setCaretPosition(caret);
    } else {
      setCaretClick(headRef, clickPosition);
      setClickPosition({ x: 0, y: 0 });
    }
  }, [headEditable]);

  const onInput = (e: React.ChangeEvent<HTMLHeadingElement>) => {
    updateText(`projects/12345/pageList/0/head`, e.target.innerText);
  };

  const onFocus = () => {
    if (headRef.current === null) return;
    headRef.current.innerText = contents.head.text;
  };

  const onBlur = () => {
    setHeadEditable(false);
  };

  const onClick = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    setHeadEditable(true);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const sel = document.getSelection();
    switch (e.keyCode) {
      case 13: // "Enter"
        e.preventDefault();
        updateContent(
          "projects/12345/pageList/0",
          addContents(contents.contents, -1, initialContent())
        );
        setEditable(addEditable(editable, -1));
        break;
      case 40: // "아랫방향 화살표"
        e.preventDefault();
        setEditable(downwardEditable(editable, -1));
        setCaret(getCaretPosition());
        break;
    }
  };
  return (
    <h1>
      <div className="text-block-container">
        <div
          className="text-block"
          style={{
            display: headEditable ? "block" : "none",
          }}
          placeholder="제목없음"
          ref={headRef}
          contentEditable={true}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        ></div>
        <div
          className="text-block"
          style={{
            display: headEditable ? "none" : "block",
          }}
          onClick={onClick}
        >
          {contents.head.text === "" ? "제목없음" : contents.head.text}
        </div>
      </div>
    </h1>
  );
};

export default Head;
