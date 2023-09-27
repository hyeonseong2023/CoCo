import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function FileDownload({ uid, name }: { uid: string; name: string }) {
  const [fileURL, setFileURL] = useState(''); // 파일 다운로드 URL을 저장하는 상태

  const handleDownload = async () => {
    try {
      const storage = getStorage(); // Firebase Storage 인스턴스 가져오기
      const storageRef = ref(storage, `files/${name + uid}`); // 다운로드할 파일의 경로 설정

      // 파일 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      // 다운로드 URL을 상태에 설정
      setFileURL(downloadURL);

      // 브라우저에서 파일 다운로드
      window.open(downloadURL, '_blank');
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>{name}</button>
    </div>
  );
}

export default FileDownload;
