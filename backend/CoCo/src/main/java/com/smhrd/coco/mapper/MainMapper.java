package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOOKMARK;

@Mapper
public interface MainMapper {

	// 조회수 증가
	public int increaseViews(int BOARD_ID);

	// 인기글(조회수기반) 가져오기
	public List<TB_BOARD> popularBoard(); 
	
	// 북마크 저장 
	public int bookmarkCheck(String CUST_ID , Integer BOARD_ID);
}