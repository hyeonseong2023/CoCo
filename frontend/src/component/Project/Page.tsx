import { useContext, useEffect } from 'react';
import Head from './Head';
import ContentList from './ContentList';
import {
  EditableContext,
  OverlayContext,
  PageContext,
} from './context/PageContext';
import { getContents, addOnValue } from './functions/firebaseCRUD';
import Overlay from './Overlay';
import {
  PageIndexContext,
  PageStructureContext,
  ProjectContext,
} from './context/ProjectContext';

const Page = () => {
  const projectId = useContext(ProjectContext);
  const pageStructureContext = useContext(PageStructureContext);
  const pageIndexContext = useContext(PageIndexContext);
  if (!projectId || !pageIndexContext || !pageStructureContext) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const { pageIndex, setPageIndex } = pageIndexContext;
  const { pageStructure, setPageStructure } = pageStructureContext;
  const pageContext = useContext(PageContext);
  const editableContext = useContext(EditableContext);
  const overlayContext = useContext(OverlayContext);
  if (!pageContext || !editableContext || !overlayContext) {
    throw new Error('PageContext must be used within a PageProvider');
  }
  const overlayVisible = overlayContext.overlayVisible;
  const setContents = pageContext.setContents;
  const setEditable = editableContext.setEditable;

  useEffect(() => {
    if (!pageStructure[pageIndex]) return;
    getContents(
      `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
      setContents,
      setEditable
    );

    addOnValue(
      `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
      pageContext,
      editableContext
    );
  }, [pageStructure, pageIndex]);

  return (
    <div className="pro-contents-container">
      {overlayVisible && <Overlay />}
      <Head />
      <ContentList />
    </div>
  );
};

export default Page;
