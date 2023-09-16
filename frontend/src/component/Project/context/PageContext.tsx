import React from "react";
import uuid from "react-uuid";

export interface ContentInterface {
  id: string;
  tag: string;
  text: string;
}

export interface PageContentInterface {
  id: string;
  head: ContentInterface;
  contents: ContentInterface[];
}

export interface PageContextInterface {
  contents: PageContentInterface;
  setContents: (contents: PageContentInterface) => void;
}

const initialContent: PageContentInterface = {
  id: uuid(),
  head: { id: uuid(), tag: "h1", text: "" },
  contents: [{ id: uuid(), tag: "div", text: "" }],
};

export const PageContext = React.createContext<PageContextInterface | null>(
  null
);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = React.useState(initialContent);

  return (
    <PageContext.Provider value={{ contents, setContents }}>
      {children}
    </PageContext.Provider>
  );
}
