import React, { useContext, useState } from "react";
import { PageContext } from "./context/PageContext";
import Content from "./Content";

const ContentList = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("PageContext must be used within a PageProvider");
  }
  const contentsList = context.contents.contents;

  return (
    <div>
      {contentsList.map((element, index) => (
        <Content key={element.id} index={index} element={element} />
      ))}
    </div>
  );
};

export default ContentList;
