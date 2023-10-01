import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';
import {
  NotiInterface,
  checkNotification,
  getNotification,
  onValueNotification,
} from './Project/functions/firebaseCRUD';
import NotiList from './NotiList';

const Notification = ({ custId }: { custId: string }) => {
  const id = custId.split('.')[0];
  const [noti, setNoti] = useState<NotiInterface[]>();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    getNotification(`notification/${id}`, setNoti);
    onValueNotification(`notification/${id}`, setNoti);
  }, []);

  const onClick = () => {
    if (!noti) return;
    setIsClicked(!isClicked);
    const data = [...noti!].map((item) => {
      return { ...item, checked: true };
    });
    checkNotification(`notification`, data);
  };

  return (
    <div>
      <Badge
        badgeContent={
          noti ? noti.filter((item) => item.checked === false).length : 0
        }
        color="error"
      >
        <button type="button" onClick={onClick}>
          <img
            style={{ width: '30px' }}
            src={process.env.PUBLIC_URL + '/notification.png'}
            alt=""
          ></img>
        </button>
      </Badge>
      {isClicked && noti && (
        <div style={{ position: 'relative' }}>
          <NotiList noti={noti} setNoti={setNoti} id={id} />
        </div>
      )}
    </div>
  );
};

export default Notification;
