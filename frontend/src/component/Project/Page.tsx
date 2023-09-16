import { useContext, useEffect } from "react";
import Head from "./Head";
import ContentList from "./ContentList";
import { EditableContext, PageContext } from "./context/PageContext";
import { getContents, addOnValue } from "./functions/firebaseCRUD";

const Page = () => {
  const projectId = "12345";
  const pageIndex = "0";
  const pageContext = useContext(PageContext);
  const editableContext = useContext(EditableContext);
  if (!pageContext || !editableContext) {
    throw new Error("PageContext must be used within a PageProvider");
  }
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
      <Head />
      <ContentList />
    </div>
  );
};

export default Page;
