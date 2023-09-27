import React from 'react';
import { Member } from './Settings';
import axios from 'axios';

//프로젝트 응모 거절로 응모테이블에서 삭제하기 (board_id, cust_id)
//  @PostMapping("applydecline")
//  public int applyDecline(@RequestBody JSONObject obj) {
//     int cnt = service.applyDecline((Integer)obj.get("board_id"), (String)obj.get("cust_id"));
//     return cnt;
//  }

const Applicant = ({
  index,
  applicants,
  setApplicants,
}: {
  index: number;
  applicants: Member[];
  setApplicants: (applicants: Member[]) => void;
}) => {
  const accept = async () => {
    const url = 'http://172.30.1.20:8099/projectaccept';
    const data = {
      board_id: 51,
      cust_id: applicants[index].cust_id,
    };
    await axios.post(url, data).then(() => {
      setApplicants(
        [...applicants].filter(
          (item) => item.cust_id !== applicants[index].cust_id
        )
      );
    });
  };

  const decline = async () => {
    const url = 'http://172.30.1.20:8099/applydecline';
    const data = {
      board_id: 51,
      cust_id: applicants[index].cust_id,
    };
    await axios.post(url, data).then(() => {
      setApplicants(
        [...applicants].filter(
          (item) => item.cust_id !== applicants[index].cust_id
        )
      );
    });
  };

  return (
    <div className="applicant-div">
      <div>
        <img
          src={'data:image/;base64,' + applicants[index].cust_img}
          alt=""
        ></img>
      </div>
      <div>{applicants[index].cust_nick}</div>
      <div onClick={accept}>수락</div>
      <div onClick={decline}>거절</div>
    </div>
  );
};

export default Applicant;
