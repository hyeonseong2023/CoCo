import React, { useContext, useEffect, useState } from 'react';
import './css/PlannerModal.css';
import uuid from 'react-uuid';
import {
  addPlanner,
  removePlanner,
  updatePlanner,
} from './functions/firebaseCRUD';
import { ProjectContext } from './context/ProjectContext';

const PlannerModal = (props: any) => {
  const projectId = useContext(ProjectContext);
  if (!projectId) {
    throw new Error('Context must be used within a ProjectProvider');
  }

  const { open, close, header, selected, edit, setEdit } = props;
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    setTitle(selected?.event?.title);
    setContents(selected?.event?.extendedProps?.contents);
  }, [edit]);

  const create = () => {
    if (selected.event?.id) {
      // 수정
      const data = {
        id: selected.event.id,
        title: title,
        start: selected.event.startStr,
        end: selected.event.endStr,
        extendedProps: { contents: contents },
      };
      updatePlanner(`projects/${projectId}/planner/${data.id}`, data);
    } else {
      const data = {
        id: uuid(),
        title: title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        extendedProps: {
          contents: contents,
        },
      };
      addPlanner(`projects/${projectId}/planner`, data);
    }
    closeModal();
  };

  const update = () => {
    setEdit(true);
  };

  const remove = () => {
    if (selected.event?.id) {
      removePlanner(`projects/${projectId}/planner/${selected.event.id}`);
    }
    closeModal();
  };

  const closeModal = () => {
    setTitle('');
    setContents('');
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}{' '}
            {edit ? (
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            ) : (
              selected.event?.title
            )}
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main>
            {edit ? (
              <textarea
                cols={57}
                rows={10}
                value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              ></textarea>
            ) : (
              selected.event?.extendedProps?.contents
            )}
          </main>
          <footer>
            {edit ? (
              <button className="close" onClick={create}>
                저장하기
              </button>
            ) : (
              <div>
                <button className="close" onClick={update}>
                  수정하기
                </button>{' '}
                <button className="close" onClick={remove}>
                  삭제하기
                </button>{' '}
              </div>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default PlannerModal;
