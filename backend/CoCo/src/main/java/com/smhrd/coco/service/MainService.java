package com.smhrd.coco.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.mapper.MainMapper;

@Service
public class MainService {

	@Autowired MainMapper mapper; 
	
	//조회수 증가 
	public int increaseViews(int BOARD_ID) {
		return mapper.increaseViews(BOARD_ID); 
	}
	
	// 인기글(조회수기반) 가져오기
	public List<TB_BOARD> popularBoard(){
		return mapper.popularBoard();
	}
	
	// 북마크 저장 
	public int bookmarkCheck(TB_BOOKMARK book) {
		return mapper.bookmarkCheck(book.getCust_id() ,book.getBoard_id());
	}
	
}
