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

export interface HeadEditableContextInterface {
  headEditable: boolean;
  setHeadEditable: (headEditable: boolean) => void;
}

export interface CaretContextInterface {
  caret: number;
  setCaret: (caret: number) => void;
}

export interface OverlayContextInterface {
  overlayRef: React.RefObject<any>;
  overlayVisible: boolean;
  setOverlayVisible: (overlayVisivle: boolean) => void;
  overlayXY: { x: number; y: number };
  setOverlayXY: (overlayXY: { x: number; y: number }) => void;
  overlayIndex: number;
  setOverlayIndex: (overlayIndex: number) => void;
}

export const PageContext = createContext<PageContextInterface | null>(null);
export const HeadEditableContext =
  createContext<HeadEditableContextInterface | null>(null);
export const EditableContext = createContext<EditableContextInterface | null>(
  null
);
export const CaretContext = createContext<CaretContextInterface | null>(null);
export const OverlayContext = createContext<OverlayContextInterface | null>(
  null
);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = useState(initialContents());
  const [headEditable, setHeadEditable] = useState(false);
  const [editable, setEditable] = useState([false]);
  const [caret, setCaret] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayXY, setOverlayXY] = useState({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const [overlayIndex, setOverlayIndex] = useState(0);

  return (
    <PageContext.Provider value={{ contents, setContents }}>
      <HeadEditableContext.Provider value={{ headEditable, setHeadEditable }}>
        <EditableContext.Provider value={{ editable, setEditable }}>
          <CaretContext.Provider value={{ caret, setCaret }}>
            <OverlayContext.Provider
              value={{
                overlayRef,
                overlayVisible,
                setOverlayVisible,
                overlayXY,
                setOverlayXY,
                overlayIndex,
                setOverlayIndex,
              }}
            >
              {children}
            </OverlayContext.Provider>
          </CaretContext.Provider>
        </EditableContext.Provider>
      </HeadEditableContext.Provider>
    </PageContext.Provider>
  );
}
