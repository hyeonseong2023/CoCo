import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import Page from './Page';
import './css/ProjectPage.css';
import { PageProvider } from './context/PageContext';
import Planner from './Planner';
import { EventInput } from '@fullcalendar/core';
import { getPlanner } from './functions/firebaseCRUD';
import { ProjectProvider } from './context/ProjectContext';
import Settings from './Settings';

const ProjectPage = () => {
  const location = useLocation();
  const { projectId, leader, nick } = location.state;
  const [selectedMenu, setSelectedMenu] = useState('Page');
  const [initialEvents, setInitialEvent] = useState<EventInput[]>([]);
  useEffect(() => {
    getPlanner(`projects/${projectId}/planner`, setInitialEvent);
  }, []);
  const changeMenu = (menu: string) => {
    switch (menu) {
      case 'Settings':
        return <Settings />;
      case 'Page':
        return (
          <PageProvider>
            <Page />
          </PageProvider>
        );
      case 'Planner':
        return <Planner initialEvents={initialEvents} />;
    }
  };
  return (
    <ProjectProvider id={projectId.toString()}>
      <div>
        <div className="pp-container">
          <SideBar setSelectedMenu={setSelectedMenu} leader={leader} />
          <div className="vertical-line"></div>
          {changeMenu(selectedMenu)}
        </div>
      </div>
    </ProjectProvider>
  );
};

export default ProjectPage;
