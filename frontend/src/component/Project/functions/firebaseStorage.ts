import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export const downloadFile = (id: string, name: string) => {
  getDownloadURL(ref(storage, `files/${name + id}`))
    .then((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      //   const xhr = new XMLHttpRequest();
      //   xhr.responseType = "blob";
      //   xhr.onload = (event) => {
      //     const blob = xhr.response;
      //   };
      //   xhr.open("GET", url);
      //   xhr.send();

      // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });
};
