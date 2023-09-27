import {
  ref,
  child,
  get,
  onValue,
  update,
  set,
  remove,
} from 'firebase/database';
import { db } from './firebase';
import {
  ContentInterface,
  EditableContextInterface,
  PageContextInterface,
  initialContents,
} from '../context/PageContext';
import { DateSelectArg, EventAddArg, EventInput } from '@fullcalendar/core';
import uuid from 'react-uuid';

const getPageStructure = (path: string, setPageStructure: (e: []) => void) => {
  const dbRef = ref(db);
  get(child(dbRef, `${path}/pageStructure`)).then((snapshot) => {
    if (snapshot.exists()) {
      setPageStructure(snapshot.val());
    } else {
      const id = uuid();
      set(ref(db, `${path}/pageStructure`), [{ id: id, text: '' }]);
      set(ref(db, `${path}/pageList/${id}`), initialContents(id));
    }
  });
};

const updatePageStructure = (path: string, contents: any) => {
  set(ref(db, path), contents);
};

const pageStructureOnValue = (
  path: string,
  setPageStructure: (e: []) => void
) => {
  onValue(ref(db, path), (snapshot) => {
    setPageStructure(snapshot.val());
  });
};

const addPage = (path: string, pageStructure: any) => {
  const id = uuid();
  set(
    ref(db, `${path}/pageStructure`),
    [...pageStructure].concat({ id: id, text: '' })
  );
  set(ref(db, `${path}/pageList/${id}`), initialContents(id));
};

const getContents = (
  path: string,
  setState: (state: any) => void,
  setEditable: (editable: boolean[]) => void
) => {
  const dbRef = ref(db);
  get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setState(snapshot.val());
        const newEditable = Array(snapshot.val().contents.length).fill(false);
        setEditable(newEditable);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const addOnValue = (
  path: string,
  pageContext: PageContextInterface | null,
  editableContext: EditableContextInterface | null
) => {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    if (!pageContext || !editableContext) {
      throw new Error('PageContext must be used within a PageProvider');
    }
    const { contents, setContents } = pageContext;
    const { editable, setEditable } = editableContext;
    setContents(data);
    let id = '';
    for (let i = 0; i < editable.length; i++) {
      if (editable[i]) {
        id = contents.contents[i].id;
      }
    }
    if (id === '') return;
    const length = data.length;
    const newEditable = Array(length).fill(false);
    for (let i = 0; i < length; i++) {
      if (data.contents[i].id === id) {
        newEditable[i] = true;
      }
    }
    setEditable(newEditable);
  });
};

const updateText = (path: string, text: string) => {
  update(ref(db, path), { text: text });
};

const updateContent = (path: string, contents: any) => {
  update(ref(db, path), { contents: contents });
};

const getPlanner = (path: string, setData: (data: any) => void) => {
  const dbRef = ref(db);
  get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data: EventInput[] = snapshot.val();
        let newList: EventInput[] = [];

        for (let objKey in data) {
          if (data.hasOwnProperty(objKey)) {
            newList.push(data[objKey]);
          }
        }
        setData(newList);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const addPlanner = (path: string, data: any) => {
  set(ref(db, `${path}/${data.id}`), data);
};

const onValuePlanner = (path: string, setData: (data: any) => void) => {
  onValue(ref(db, path), (snapshot) => {
    if (!snapshot.val()) {
      setData([]);
      return;
    }
    setData(Object.values(snapshot.val()));
  });
};

const removePlanner = (path: string) => {
  remove(ref(db, path));
};

const updatePlanner = (path: string, data: any) => {
  set(ref(db, path), data);
};

export {
  getContents,
  addOnValue,
  updateText,
  updateContent,
  onValuePlanner,
  getPlanner,
  addPlanner,
  removePlanner,
  updatePlanner,
  getPageStructure,
  updatePageStructure,
  pageStructureOnValue,
  addPage,
};
