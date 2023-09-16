import { useContext, useEffect } from "react";
import Head from "./Head";
import ContentList from "./ContentList";
import { PageContext } from "./context/PageContext";
import { getContents, addOnValue } from "./functions/firebaseCRUD";

const Page = () => {
  const projectId = "12345";
  const pageIndex = "0";
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const setContents = context.setContents;

  useEffect(() => {
    getContents(`projects/${projectId}/pageList/${pageIndex}`, setContents);
    addOnValue(`projects/${projectId}/pageList/${pageIndex}`, setContents);
  }, []);
  return (
    <div>
      <Head />
      <ContentList />
    </div>
  );
};

export default Page;
