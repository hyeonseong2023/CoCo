package com.smhrd.coco.mapper;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_APPLY;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_NOTICE;

@Mapper
public interface BoardMapper {

	// TB_BOARD 정보 저장
	public int postSaveBoard(TB_BOARD board);
	
	// TB_BOARD 정보 업데이트
	public int postUpdateBoard(TB_BOARD board);

	// TB_BOARD_SKILL 정보 저장
	public int postSaveSkill(int board_id, String SKILL_NAME);
	
	// TB_BOARD_SKILL 정보 삭제
	public int postDeleteSkill(int board_id);
	
	//TB_BOARD_SKILL 정보 업데이트
	public int postUpdateSkill(TB_BOARD_SKILL skill, int board_id);

	// TB_BOARD_IMG 정보저장
	public int postSaveImg(TB_BOARD_IMG img);
	
	// TB_BOARD_IMG 정보 업데이트
	public int postUpdateImg(TB_BOARD_IMG img, int board_id);
	
	//게시글 작성시 APPLY 게시판 응모여부에 H(호스트)로 저장하기
	public int postSaveApply(int board_id, String cust_id);

	// 선택한 게시물 TB_BOARD 정보 가져오기
	public TB_BOARD selectPostBoard(int board_id);
	
	// 선택한 게시물 작성자 정보 가져오기
	public TB_CUST selectPostCust(String cust_id);

	// 선택한 게시물 TB_BOARD_SKILL 정보 가져오기
	public List<TB_BOARD_SKILL> selectPostSkill(int board_id);

	// 선택한 게시물 TB_BOARD_IMG 정보 가져오기
	public TB_BOARD_IMG selectPostImag(int board_id);

	// 선택한 게시물 TB_BOOKMARK 정보 가져오기
	public int selectPostBmk(int board_id, String cust_id);

	// 선택한 게시물 TB_APPLY 정보 가져오기
	public int selectPostApply(int board_id, String cust_id);
	
	// 게시글에 지원시 APPLY 테이블에 정보 추가
	public int postApply(int board_id, String sender_id);
	
	// 게시글 지원취소
	public int unPostApply(int board_id, String cust_id);
	
	//알림 보낼때 notice 테이블 정보 가져오기
	public List<TB_NOTICE> noticeInfo(String cust_id);
	
	//알림 보낼때 발송자 정보 가져오기
	public List<TB_CUST> senderInfo(String sender_id);

	//프로젝트 링크 보내기(없는지 확인하여 있다면 생성)
	public String getOrCreateProLink(int board_id);
	
	//게시글 모집마감
	public int postDeadline(int board_id, String toDay);
	
	//게시글 삭제 클릭시 board_id => admin 관리자로 변경
	public int postDelete(int board_id);


}