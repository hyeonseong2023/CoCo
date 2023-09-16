import React, { useContext, useEffect, useRef, useState } from "react";
import { updateText } from "./functions/firebaseCRUD";
import { PageContext } from "./context/PageContext";
import { setCaretPosition } from "./functions/caret";

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
    setCaretPosition(headRef, clickPosition);
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
    <div>
      <h1
        style={{
          display: editable ? "block" : "none",
        }}
        ref={headRef}
        contentEditable={true}
        onInput={onInput}
        onBlur={onBlur}
      ></h1>
      <h1
        style={{
          display: editable ? "none" : "block",
        }}
        onClick={onClick}
      >
        {contents.head.text}
      </h1>
    </div>
  );
};

export default Head;
