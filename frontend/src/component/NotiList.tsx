import { useEffect, useState } from 'react';
import {
  NotiInterface,
  removeNotification,
} from './Project/functions/firebaseCRUD';
import axios from 'axios';
import profileImg from '../img/profilePicture.png';
import closeImg from '../img/x.png';
import '../css/Notification.css';

interface notiContent {
  cust_nick: string;
  cust_img: string;
  contents: string;
  date: string;
}

const NotiList = ({
  noti,
  setNoti,
  id,
}: {
  noti: NotiInterface[];
  setNoti: (noti: NotiInterface[]) => void;
  id: string;
}) => {
  const [notiContents, setNotiContents] = useState<notiContent[]>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/notification`;
    const data = {
      notiList: noti.map((item) => {
        return item.sender;
      }),
    };
    await axios.post(url, data).then((res) => {
      let notifications = noti.map((item, index) => {
        return {
          ...res.data[index],
          contents: item.contents,
          date: item.date,
        };
      });
      setNotiContents(notifications);
    });
  };

  const onClick = (index: number) => {
    const data = [...noti].filter((item, idx) => idx !== index);
    setNoti(data);
    removeNotification(`notification/${id}`, data);
  };
  return (
    <div className="notification-container">
      {notiContents &&
        notiContents.map((item, index) => (
          <div className="notification-contents-container">
            <div>
              <img
                className="notification-profileImg"
                src={
                  item.cust_img
                    ? 'data:image/;base64,' + item.cust_img
                    : profileImg
                }
                alt=""
              ></img>
            </div>
            <div>
              <div className="notification-text">
                <b>{item.cust_nick}</b>
                {item.contents}
              </div>
              <div className="notification-date">{item.date}</div>
            </div>
            <div className="notification-close">
              <img
                src={closeImg}
                alt=""
                onClick={() => {
                  onClick(index);
                }}
              ></img>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotiList;
