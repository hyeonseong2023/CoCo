import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export const getImgUrl = (
  id: string,
  name: string,
  setImgUrl: (imgUrl: string) => void
) => {
  getDownloadURL(ref(storage, `images/${id + name}`)).then((snapshot) => {
    console.log('getDownloadUrl', snapshot);

    snapshot && setImgUrl(snapshot);
  });
};
