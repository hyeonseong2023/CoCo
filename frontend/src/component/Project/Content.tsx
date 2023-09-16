import React, { useContext, useEffect, useRef, useState } from "react";
import { ContentInterface, PageContext } from "./context/PageContext";
import { setCaretPosition } from "./functions/caret";
import { updateText } from "./functions/firebaseCRUD";
import "../../css/ProjectContents.css";

const Content = ({
  index,
  element,
}: {
  index: number;
  element: ContentInterface;
}) => {
  const [editable, setEditable] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const tagRef = useRef<HTMLDivElement | HTMLHeadingElement>(null);

  useEffect(() => {
    setCaretPosition(tagRef, clickPosition);
  }, [editable]);

  const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    updateText(
      `projects/12345/pageList/0/contents/${index}`,
      e.target.innerText
    );
  };

  const onBlur = () => {
    setEditable(false);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (tagRef.current === null) return;
    tagRef.current.innerText = element.text;
    setEditable(true);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  const editableTag = () => {
    return (
      <div className="text-block">
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
