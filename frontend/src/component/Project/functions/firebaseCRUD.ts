import { ref, child, get, onValue, update } from "firebase/database";
import { db } from "./firebase";

const getContents = (path: string, setState: (state: any) => void) => {
  const dbRef = ref(db);
  get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setState(snapshot.val());
      } else {
        console.log("data doesn't exist");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const addOnValue = (path: string, setState: (state: any) => void) => {
  onValue(ref(db, path), (snapshot) => {
    setState(snapshot.val());
  });
};

const updateText = (path: string, text: string) => {
  update(ref(db, path), { text: text });
};

export { getContents, addOnValue, updateText };
