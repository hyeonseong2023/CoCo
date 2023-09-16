import { ref, child, get, onValue, update } from "firebase/database";
import { db } from "./firebase";
import {
  ContentInterface,
  EditableContextInterface,
  PageContextInterface,
} from "../context/PageContext";

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

// const removeContent = ()

export { getContents, addOnValue, updateText, updateContent };
