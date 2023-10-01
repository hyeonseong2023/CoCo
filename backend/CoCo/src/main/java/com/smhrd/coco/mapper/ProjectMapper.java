package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;

@Mapper
public interface ProjectMapper {
	
	//프로젝트 응모 수락여부 Y인 멤버들 닉네임, 프로필사진 정보 보내기
	public List<TB_CUST> projectMemberList(int board_id);
	
	//프로젝트 응모 수락여부 N인 유저 아이디, 닉네임, 프로필사진
	public List<TB_CUST> projectApplyList(int board_id);
	
	//응모여부 N -> Y 로 바꾸기 (board_id, cust_id)
	public int projectAccept(int board_id, String cust_id);
	
	//프로젝트 응모 거절로 응모테이블에서 삭제하기
	public int applyDecline(int board_id, String cust_id);
	
	//프로젝트 명, 프로젝트 이미지 보내기. 이미지 없으면 null 값으로 (board_id)
	public TB_BOARD projectInfo(int board_id);
	
	//프로젝트 명, 프로젝트 이미지 업데이트 (board_id)
	public int projectInfoUpdate(String pro_img, int board_id, String pro_title);
	
	//알림 닉네임, 프로필 가져오기
	public TB_CUST getNoti(String cust_id);

}
