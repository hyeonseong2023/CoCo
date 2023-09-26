import React, { useState, useEffect, useContext } from 'react';
import { storage } from './functions/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-uuid';
import { addContents } from './functions/contents';
import { ContentInterface } from './context/PageContext';
import { updateContent } from './functions/firebaseCRUD';
import {
  PageIndexContext,
  PageStructureContext,
  ProjectContext,
} from './context/ProjectContext';

const FileInputBox = ({
  children,
  contents,
  index,
}: {
  children: React.ReactNode;
  contents: ContentInterface[];
  index: number;
}) => {
  const projectId = useContext(ProjectContext);
  const pageStructureContext = useContext(PageStructureContext);
  const pageIndexContext = useContext(PageIndexContext);
  if (!projectId || !pageIndexContext || !pageStructureContext) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const { pageIndex, setPageIndex } = pageIndexContext;
  const { pageStructure, setPageStructure } = pageStructureContext;
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    uploadFile();
  }, [file]);

  const uploadFile = async () => {
    if (file == null || file?.type === undefined) return;
    const root = file.type.split('/')[0] === 'image' ? 'image' : 'file';
    const id = uuid();
    const fileRef = ref(storage, `${root}s/${file.name + id}`);
    await uploadBytes(fileRef, file).then(() => {
      alert('업로드 완료');
    });
    updateContent(
      `projects/${projectId}/pageList/${pageStructure[pageIndex].id}`,
      addContents(contents, index, { id: id, tag: root, text: file.name })
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
