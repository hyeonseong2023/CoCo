import {
  ref,
  child,
  get,
  onValue,
  update,
  set,
  remove,
} from "firebase/database";
import { db } from "./firebase";
import {
  ContentInterface,
  EditableContextInterface,
  PageContextInterface,
} from "../context/PageContext";
import { DateSelectArg, EventAddArg, EventInput } from "@fullcalendar/core";
import uuid from "react-uuid";

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
      } else {
        console.log("data doesn't exist");
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
      throw new Error("PageContext must be used within a PageProvider");
    }
    const { contents, setContents } = pageContext;
    const { editable, setEditable } = editableContext;
    setContents(data);
    let id = "";
    for (let i = 0; i < editable.length; i++) {
      if (editable[i]) {
        id = contents.contents[i].id;
      }
    }
    if (id === "") return;
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

const updateContent = (path: string, contents: ContentInterface[]) => {
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
      } else {
        console.log("data doesn't exist");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const addPlanner = (path: string, data: any) => {
  set(ref(db, path + `/${data.id}`), data);
};

const onValuePlanner = (path: string, setData: (data: any) => void) => {
  onValue(ref(db, path), (snapshot) => {
    const val = snapshot.val();
    console.log(val);
    console.log("111");

    console.log(Object.values(val));

    setData(Object.values(snapshot.val()));
  });
};

const removePlanner = (path: string) => {
  remove(ref(db, path));
};

const updatePlanner = (path: string, data: any) => {
  update(ref(db, path), data);
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
};
