import React, { useState } from 'react';
import { updateContent, updatePageStructure } from './functions/firebaseCRUD';
import { removeContents } from './functions/contents';
import { pageStructureInterface } from './context/ProjectContext';
import { useDrag, useDrop } from 'react-dnd';

const MenuItem = ({
  index,
  id,
  text,
  projectId,
  setPageIndex,
  pageStructure,
  moveContent,
  findContent,
}: {
  index: number;
  id: string;
  text: string;
  projectId: string;
  setPageIndex: (pageIndex: number) => void;
  pageStructure: pageStructureInterface[];
  moveContent: (id: string, atIndex: number) => void;
  findContent: (id: string) => {
    content: pageStructureInterface;
    index: number;
  };
}) => {
  const [isHovering, setIseHovering] = useState(false);
  const originalIndex = findContent(id).index;

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'PAGESTRUCTURE',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [originalIndex]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'PAGESTRUCTURE',
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

  const deleteFile = (index: number) => {
    if (pageStructure.length === 1) return;
    // eslint-disable-next-line no-restricted-globals
    if (confirm('삭제하시겠습니까?')) {
      updatePageStructure(
        `projects/${projectId}/pageStructure`,
        [...pageStructure].filter((item, idx) => idx !== index)
      );
    }
  };
  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onMouseOver={() => {
        setIseHovering(true);
      }}
      onMouseLeave={() => {
        setIseHovering(false);
      }}
      onClick={() => {
        setPageIndex(index);
      }}
    >
      {text === '' ? '제목없음' : text}{' '}
      <img
        onClick={() => {
          deleteFile(index);
        }}
        style={{
          display: isHovering ? 'inline' : 'none',
          height: '15px',
          width: '15px',
        }}
        src={process.env.PUBLIC_URL + '/projectImg/deleteFile.png'}
        alt=""
      ></img>
    </div>
  );
};

export default MenuItem;
