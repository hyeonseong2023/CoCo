import { useContext, useEffect } from "react";
import Head from "./Head";
import ContentList from "./ContentList";
import {
  EditableContext,
  OverlayContext,
  PageContext,
} from "./context/PageContext";
import { getContents, addOnValue } from "./functions/firebaseCRUD";
import Overlay from "./Overlay";

const Page = () => {
  const projectId = "12345";
  const pageIndex = "0";
  const pageContext = useContext(PageContext);
  const editableContext = useContext(EditableContext);
  const overlayContext = useContext(OverlayContext);
  if (!pageContext || !editableContext || !overlayContext) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const overlayVisible = overlayContext.overlayVisible;
  const setContents = pageContext.setContents;
  const setEditable = editableContext.setEditable;

  useEffect(() => {
    getContents(
      `projects/${projectId}/pageList/${pageIndex}`,
      setContents,
      setEditable
    );

    addOnValue(
      `projects/${projectId}/pageList/${pageIndex}`,
      pageContext,
      editableContext
    );
  }, []);

  return (
    <div>
      {overlayVisible && <Overlay />}
      <Head />
      <ContentList />
    </div>
  );
};

export default Page;
