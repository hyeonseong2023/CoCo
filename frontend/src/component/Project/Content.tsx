import React, { useContext, useEffect, useRef, useState } from 'react';
import './css/Content.css';
import {
  CaretContext,
  ContentInterface,
  EditableContext,
  HeadEditableContext,
  OverlayContext,
  PageContext,
  initialContent,
} from './context/PageContext';
import {
  getCaretPoint,
  getCaretPosition,
  setCaretClick,
  setCaretPosition,
} from './functions/caret';
import { updateContent, updateText } from './functions/firebaseCRUD';
import './css/ProjectContents.css';
import { addContents, removeContents } from './functions/contents';
import {
  addEditable,
  downwardEditable,
  removeEditable,
  setFalseEditable,
  setTrueEditable,
  upwardEditable,
} from './functions/editable';
import { useDrag, useDrop } from 'react-dnd';
import FileInputBox from './FileInputBox';
import { getTagContent } from './functions/tagList';
import { getImgUrl } from './functions/firebaseStorage';
import FileDownload from './FileDownload';
import {
  PageIndexContext,
  PageStructureContext,
  ProjectContext,
} from './context/ProjectContext';

const Content = ({
  index,
  element,
  id,
  moveContent,
  findContent,
}: {
  index: number;
  element: ContentInterface;
  id: string;
  moveContent: (id: string, atIndex: number) => void;
  findContent: (id: string) => {
    content: ContentInterface;
    index: number;
  };
}) => {
  const projectId = useContext(ProjectContext);
  const pageStructureContext = useContext(PageStructureContext);
  const pageIndexContext = useContext(PageIndexContext);
  if (!projectId || !pageIndexContext || !pageStructureContext) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const { pageIndex, setPageIndex } = pageIndexContext;
  const { pageStructure, setPageStructure } = pageStructureContext;
  const pageContext = useContext(PageContext);
  const headEditableContext = useContext(HeadEditableContext);
  const editableContext = useContext(EditableContext);
  const caretContext = useContext(CaretContext);
  const overlayContext = useContext(OverlayContext);

  if (
    !pageContext ||
    !editableContext ||
    !caretContext ||
    !overlayContext ||
    !headEditableContext
  ) {
    throw new Error('Context must be used within a PageProvider');
  }
  const contents = pageContext.contents.contents;
  const setHeadEditable = headEditableContext.setHeadEditable;
  const { editable, setEditable } = editableContext;
  const { caret, setCaret } = caretContext;
  const {
    overlayRef,
    overlayIndex,
    setOverlayIndex,
    setOverlayXY,
    overlayVisible,
    setOverlayVisible,
  } = overlayContext;
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [imgUrl, setImgUrl] = useState('');
  const [isHovering, setIseHovering] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const originalIndex = findContent(id).index;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'CONTENTS',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [originalIndex]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'CONTENTS',
      hover: (item: { id: string; originalIndex: number }) => {
        if (item.id !== id) {
          // hover된 요소와 index 교환! -> 위치 교환
          const { index: overIndex } = findContent(id);
          moveContent(item.id, overIndex);
        }
      },
    }),
    [findContent, moveContent]
  );

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
      `projects/${projectId}/pageList/${pageStructure[pageIndex].id}/contents/${index}`,
      e.target.innerText
    );
  };

  const onFocus = () => {
    if (tagRef.current === null) return;
    tagRef.current.innerText = element.text;
  };

  const onBlur = () => {
    setEditable(setFalseEditable(editable, index));
    setOverlayVisible(false);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditable(setTrueEditable(editable, index));
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = document.getSelection();
    switch (e.keyCode) {
      case 13: // "Enter"
        e.preventDefault();

        const tagContent = overlayVisible
          ? getTagContent(overlayIndex)
          : initialContent();
        updateContent(
          `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
          addContents(contents, index, tagContent)
        );
        setEditable(addEditable(editable, index));
        break;
      case 8: // "Backspace"
        if (selection?.anchorOffset === 0 && index !== 0) {
          e.preventDefault();
          updateContent(
            `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
            removeContents(contents, index)
          );
          setEditable(removeEditable(editable, index));
          setCaret(31415928979);
        }
        break;
      case 38: // "윗방향 화살표"
        e.preventDefault();
        if (overlayVisible) {
          overlayIndex === 0
            ? setOverlayIndex(overlayRef.current!.childElementCount - 1)
            : setOverlayIndex(overlayIndex - 1);
          return;
        }
        setEditable(upwardEditable(editable, index));
        if (index === 0) {
          setHeadEditable(true);
        }
        setCaret(getCaretPosition());
        break;
      case 40: // "아랫방향 화살표"
        e.preventDefault();
        if (overlayVisible) {
          overlayRef.current?.childElementCount === overlayIndex + 1
            ? setOverlayIndex(0)
            : setOverlayIndex(overlayIndex + 1);
          return;
        }
        setEditable(downwardEditable(editable, index));
        setCaret(getCaretPosition());
        break;
      case 119: // "F8"
        e.preventDefault();
        setOverlayIndex(0);
        setOverlayVisible(true);
        const position = getCaretPoint();
        setOverlayXY({
          x: position.left,
          y: position.top,
        });
    }
  };

  const fileTag = () => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onMouseOver={() => {
          setIseHovering(true);
        }}
        onMouseLeave={() => {
          setIseHovering(false);
        }}
      >
        <FileDownload uid={element.id} name={element.text}></FileDownload>
        <img
          onClick={deleteFile}
          style={{
            display: isHovering ? 'inline' : 'none',
            height: '20px',
            width: '20px',
          }}
          src={process.env.PUBLIC_URL + '/projectImg/deleteFile.png'}
          alt=""
        ></img>
      </div>
    );
  };

  const imgTag = () => {
    getImgUrl(element.id, element.text, setImgUrl);
    return (
      <div
        onMouseOver={() => {
          setIseHovering(true);
        }}
        onMouseLeave={() => {
          setIseHovering(false);
        }}
      >
        <img className="img-project" src={imgUrl} alt=""></img>
        <img
          style={{
            display: isHovering ? 'inline' : 'none',
            height: '30px',
            width: '30px',
          }}
          onClick={deleteFile}
          src={process.env.PUBLIC_URL + '/projectImg/deleteFile.png'}
          alt=""
        ></img>
      </div>
    );
  };

  const deleteFile = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('삭제하시겠습니까?')) {
      updateContent(
        `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
        removeContents(contents, index)
      );
    }
  };

  const editableTag = () => {
    return (
      <div>
        <div
          className="text-block"
          style={{
            display: editable[index] ? 'block' : 'none',
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
            display: editable[index] ? 'none' : 'block',
          }}
          onClick={onClick}
        >
          {element.text}
        </div>
      </div>
    );
  };

  const switchTag = (tag: string) => {
    switch (tag) {
      case 'div':
        return <div>{editableTag()}</div>;
      case 'h1':
        return <h1>{editableTag()}</h1>;
      case 'h3':
        return <h3>{editableTag()}</h3>;
      case 'file':
        return <div>{fileTag()}</div>;
      case 'image':
        return <div>{imgTag()}</div>;
      default:
        return <div>{editableTag()}</div>;
    }
  };

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <FileInputBox contents={contents} index={index}>
        {switchTag(element.tag)}
      </FileInputBox>
    </div>
  );
};

export default Content;
