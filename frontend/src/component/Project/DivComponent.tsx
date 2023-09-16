import React, { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "./context/PageContext";
import { setCaretPosition } from "./functions/caret";
import { updateText } from "./functions/firebaseCRUD";

const DivComponent = () => {
  const [editable, setEditable] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const tagRef = useRef<HTMLDivElement>(null);
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const contentsList = context.contents.contents;

  useEffect(() => {
    setCaretPosition(tagRef, clickPosition);
  }, [editable]);

  const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    updateText(`projects/12345/pageList/0/contents/0`, e.target.innerText);
  };

  const onBlur = () => {
    setEditable(false);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (tagRef.current === null) return;
    tagRef.current.innerText = contentsList[0].text;
    setEditable(true);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div>
      <div
        style={{
          display: editable ? "block" : "none",
        }}
        ref={tagRef}
        contentEditable={true}
        onInput={onInput}
        onBlur={onBlur}
      ></div>
      <div
        style={{
          display: editable ? "none" : "block",
        }}
        onClick={onClick}
      >
        {contentsList[0].text}
      </div>
    </div>
  );
};

export default DivComponent;
