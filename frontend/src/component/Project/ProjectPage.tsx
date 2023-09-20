import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Page from "./Page";
import "../../css/ProjectPage.css";
import { PageProvider } from "./context/PageContext";
import Planner from "./Planner";
import { EventInput } from "@fullcalendar/core";
import { getPlanner } from "./functions/firebaseCRUD";

const ProjectPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Page");
  const [initialEvents, setInitialEvent] = useState<EventInput[]>([]);
  useEffect(() => {
    getPlanner("projects/12345/planner", setInitialEvent);
  }, [selectedMenu]);
  const changeMenu = (menu: string) => {
    switch (menu) {
      case "Page":
        return (
          <PageProvider>
            <Page />
          </PageProvider>
        );
      case "Planner":
        return <Planner initialEvents={initialEvents} />;
    }
  };
  return (
    <div>
      <div className="pp-container">
        <SideBar setSelectedMenu={setSelectedMenu} />
        {changeMenu(selectedMenu)}
      </div>
    </div>
  );
};

export default ProjectPage;
