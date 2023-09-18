import React from "react";
import SideBar from "./SideBar";
import Page from "./Page";
import "../../css/ProjectPage.css";
import { PageProvider } from "./context/PageContext";

const ProjectPage = () => {
  return (
    <div>
      <div className="pp-container">
        <SideBar />
        <PageProvider>
          <Page />
        </PageProvider>
      </div>
    </div>
  );
};

export default ProjectPage;
