package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.RequestBody;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;

@Mapper
public interface MainMapper {

	// 조회수 증가
	public int increaseViews(int board_id);

	// 인기글(조회수기반) 가져오기
	public List<TB_BOARD> popularList(); 
	
	// 해당게시글 스킬 리스트 가져오기 
	public List<TB_BOARD_SKILL> boardIdList(int board_id); 

	// 북마크 저장 
	public int bookmarkCheck(String cust_id , Integer board_id);
	
	// 북마크 해제 
	public int unBookmark(String cust_id, Integer board_id); 
	
	// 북마크된 게시글만 불러오기 
	public List<TB_BOARD> bookmarkList(String cust_id);
		
	// 최신순 게시글 6개씩 가져오기 
	public List<TB_BOARD> recentList(int endpoint); 
	
	// 스킬에 맞는 최신순 게시글 가져오기
	public List<TB_BOARD> skillList(String skill_name, int endpoint );
	
	// 포지션에 맞는 최신순 게시글 가져오기 
	public List<TB_BOARD> positionList(String board_position, int endpoint); 
	
	// 지원한 게시글 보기 
	public List<TB_BOARD> applyList(String cust_id); 
	
	// 내가 작성한 글 보기
	public List<TB_BOARD> writeList(String cust_id); 
}