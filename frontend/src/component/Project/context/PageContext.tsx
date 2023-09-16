import React, { createContext, useRef, useState } from "react";
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

export function initialContent(): ContentInterface {
  return {
    id: uuid(),
    tag: "div",
    text: "",
  };
}

export function initialContents(): PageContentInterface {
  return {
    id: uuid(),
    head: { id: uuid(), tag: "h1", text: "" },
    contents: [initialContent()],
  };
}

export interface EditableContextInterface {
  editable: boolean[];
  setEditable: (editable: boolean[]) => void;
}

export interface CaretContextInterface {
  caret: number;
  setCaret: (caret: number) => void;
}

export interface OverlayContextInterface {
  overlayXY: { x: number; y: number };
  overlayIndex: number;
  overlayRef;
}

export const PageContext = createContext<PageContextInterface | null>(null);
export const EditableContext = createContext<EditableContextInterface | null>(
  null
);
export const CaretContext = createContext<CaretContextInterface | null>(null);
export const OverRayContext = createContext<OverlayContextInterface | null>(
  null
);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = useState(initialContents());
  const [editable, setEditable] = useState([false]);
  const [caret, setCaret] = useState(0);
  const overlayRef = useRef(null);
  const overlayIndex = useState(0);
  const [overlayXY, setOverlayXY] = useState({ x: 0, y: 0 });

  return (
    <PageContext.Provider value={{ contents, setContents }}>
      <EditableContext.Provider value={{ editable, setEditable }}>
        <CaretContext.Provider value={{ caret, setCaret }}>
          {children}
        </CaretContext.Provider>
      </EditableContext.Provider>
    </PageContext.Provider>
  );
}
