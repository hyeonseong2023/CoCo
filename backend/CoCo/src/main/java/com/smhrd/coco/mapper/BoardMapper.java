package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_APPLY;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;

@Mapper
public interface BoardMapper {

	// TB_BOARD 정보 저장
	public int postSaveBoard(TB_BOARD board);

	// TB_BOARD_SKILL 정보 저장
	public int postSaveSkill(TB_BOARD_SKILL skill);

	// TB_BOARD_IMG 정보저장
	public int postSaveImg(TB_BOARD_IMG img);

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
	
	// 게시글에 지원하기
	public int postApply(int board_id, String cust_id);
	
	// 게시글 지원취소
	public int unPostApply(int board_id, String cust_id);

}