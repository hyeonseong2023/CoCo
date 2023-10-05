import { useContext } from 'react';
import {
  PageIndexContext,
  PageStructureContext,
  ProjectContext,
} from './context/ProjectContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { addPage, updatePageStructure } from './functions/firebaseCRUD';
import MenuItem from './MenuItem';

const PageList = () => {
  const projectId = useContext(ProjectContext);
  const pageStructureContext = useContext(PageStructureContext);
  const pageIndexContext = useContext(PageIndexContext);
  if (!projectId || !pageIndexContext || !pageStructureContext) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const { pageIndex, setPageIndex } = pageIndexContext;
  const { pageStructure, setPageStructure } = pageStructureContext;

  const handleAddPage = () => {
    addPage(`projects/${projectId}`, pageStructure);
    setPageIndex(pageIndex + 1);
  };

  const findContent = (id: string) => {
    const content = pageStructure.filter((item) => `${item.id}` === id)[0];
    return {
      content,
      index: pageStructure.indexOf(content),
    };
  };

  const moveContent = (id: string, atIndex: number) => {
    const { content, index } = findContent(id);

    const data = update(pageStructure, {
      $splice: [
        [index, 1],
        [atIndex, 0, content],
      ],
    });

    updatePageStructure(`projects/${projectId}/pageStructure`, data);
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {pageStructure &&
          pageStructure.map((item, index) => (
            <MenuItem
              key={item.id}
              index={index}
              id={item.id}
              text={item.text}
              projectId={projectId}
              moveContent={moveContent}
              findContent={findContent}
              setPageIndex={setPageIndex}
              pageStructure={pageStructure}
            />
          ))}
      </DndProvider>
      <div onClick={handleAddPage} className='cusrsor'>+ 페이지 추가</div>
    </div>
  );
};

export default PageList;
