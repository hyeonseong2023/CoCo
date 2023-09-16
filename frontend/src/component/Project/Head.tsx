import React, { useContext, useEffect, useRef, useState } from "react";
import { updateText } from "./functions/firebaseCRUD";
import { PageContext } from "./context/PageContext";
import { setCaretClick } from "./functions/caret";
import "../../css/ProjectContents.css";

const Head = () => {
  const [editable, setEditable] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const headRef = useRef<HTMLHeadingElement>(null);
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const contents = context.contents;

  useEffect(() => {
    setCaretClick(headRef, clickPosition);
  }, [editable]);

  const onInput = (e: React.ChangeEvent<HTMLHeadingElement>) => {
    updateText(`projects/12345/pageList/0/head`, e.target.innerText);
  };

  const onBlur = () => {
    setEditable(false);
  };

  const onClick = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    if (headRef.current === null) return;
    headRef.current.innerText = contents.head.text;
    setEditable(true);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <h1>
      <div className="text-block-container">
        <div
          className="text-block"
          style={{
            display: editable ? "block" : "none",
          }}
          placeholder="제목없음"
          ref={headRef}
          contentEditable={true}
          onInput={onInput}
          onBlur={onBlur}
        ></div>
        <div
          className="text-block"
          style={{
            display: editable ? "none" : "block",
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
