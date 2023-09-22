import React, { useState, useEffect } from "react";
import { storage } from "./functions/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";
import { addContents } from "./functions/contents";
import { ContentInterface } from "./context/PageContext";
import { updateContent } from "./functions/firebaseCRUD";

const FileInputBox = ({
  children,
  contents,
  index,
}: {
  children: React.ReactNode;
  contents: ContentInterface[];
  index: number;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    uploadFile();
  }, [file]);

  const uploadFile = () => {
    if (file == null) return;
    const id = uuid();
    const fileRef = ref(storage, `files/${file.name + id}`);
    uploadBytes(fileRef, file).then(() => {
      alert("File Uploaded");
    });
    updateContent(
      "projects/12345/pageList/0",
      addContents(contents, index, { id: id, tag: "file", text: file.name })
    );
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
    setIsDragging(false);
  };
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};

export default FileInputBox;
