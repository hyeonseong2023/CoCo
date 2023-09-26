import React, { useCallback, useContext, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { PageContext } from './context/PageContext';
import Content from './Content';
import { updateContent } from './functions/firebaseCRUD';
import {
  PageIndexContext,
  PageStructureContext,
  ProjectContext,
} from './context/ProjectContext';

const ContentList = () => {
  const projectId = useContext(ProjectContext);
  const pageStructureContext = useContext(PageStructureContext);
  const pageIndexContext = useContext(PageIndexContext);
  if (!projectId || !pageIndexContext || !pageStructureContext) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const { pageIndex, setPageIndex } = pageIndexContext;
  const { pageStructure, setPageStructure } = pageStructureContext;

  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used within a PageProvider');
  }
  const contentsList = context.contents.contents;

  const findContent = (id: string) => {
    const content = contentsList.filter((item) => `${item.id}` === id)[0];
    return {
      content,
      index: contentsList.indexOf(content),
    };
  };

  const moveContent = (id: string, atIndex: number) => {
    const { content, index } = findContent(id);

    const data = update(contentsList, {
      $splice: [
        [index, 1],
        [atIndex, 0, content],
      ],
    });

    updateContent(`projects/${projectId}/pageStructure}`, data);
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {contentsList &&
          contentsList.map((element, index) => (
            <Content
              key={element.id}
              id={element.id}
              moveContent={moveContent}
              findContent={findContent}
              index={index}
              element={element}
            />
          ))}
      </DndProvider>
    </div>
  );
};

export default ContentList;
