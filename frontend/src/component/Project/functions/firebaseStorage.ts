import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export const getImgUrl = (
  id: string,
  name: string,
  setImgUrl: (imgUrl: string) => void
) => {
  getDownloadURL(ref(storage, `images/${name + id}`)).then((snapshot) => {
    console.log('getDownloadUrl', snapshot);

    snapshot && setImgUrl(snapshot);
  });
};
