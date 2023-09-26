import { createContext, useEffect, useState } from 'react';
import {
  getPageStructure,
  pageStructureOnValue,
} from '../functions/firebaseCRUD';

export interface projectContextInterface {
  projectId: string;
  setProjectId: (projectId: string) => void;
}

export interface pageIndexContextInterface {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}

export interface pageStructureInterface {
  id: string;
  text: string;
}

export interface PageStructureContextInterface {
  pageStructure: pageStructureInterface[];
  setPageStructure: (pageStructure: pageStructureInterface[]) => void;
}

export const ProjectContext = createContext<string | null>(null);
export const PageStructureContext =
  createContext<PageStructureContextInterface | null>(null);
export const PageIndexContext = createContext<pageIndexContextInterface | null>(
  null
);

export function ProjectProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  let projectId = id;
  const [pageStructure, setPageStructure] = useState<pageStructureInterface[]>(
    []
  );
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    pageStructureOnValue(
      `projects/${projectId}/pageStructure`,
      setPageStructure
    );
    getPageStructure(`projects/${projectId}`, setPageStructure);
  }, []);

  return (
    <ProjectContext.Provider value={projectId}>
      <PageStructureContext.Provider
        value={{ pageStructure, setPageStructure }}
      >
        <PageIndexContext.Provider value={{ pageIndex, setPageIndex }}>
          {children}
        </PageIndexContext.Provider>
      </PageStructureContext.Provider>
    </ProjectContext.Provider>
  );
}
