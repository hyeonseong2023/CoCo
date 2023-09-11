package com.smhrd.coco.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.service.MainService;

@RestController
@CrossOrigin("http://localhost:3000")
public class MainController {

	@Autowired
	MainService service;

	// 조회수 증가 
	@GetMapping("/views")
	public int views(@RequestParam("boardid") int BOARD_ID) {

		int increaseViews = service.increaseViews(BOARD_ID);

		if (increaseViews > 0) {
			return 1; // 성공
		} else {
			return 0; // 실패
		}

	}
	
	// 인기글(조회수기반) 가져오기
	@PostMapping("/main")
	public JSONObject main() {
		
		List<TB_BOARD> popularBoard = service.popularBoard(); 
		
		// 한 곳에 담아 보내기
		JSONObject obj = new JSONObject();
		obj.put("popularBoard", popularBoard);
		
		return obj; 
	}
	
	// 북마크 저장 
	@PostMapping("/bookmarkcheck")
	public void bookmarkCheck(@RequestBody TB_BOOKMARK book) {  // VO 타입으로 가져올때는 필드명이 대문자 이면 안됨! 
		int bookmarkCheck = service.bookmarkCheck(book); 
	}
	
	// 북마크된 게시글만 불러오기 (회원아이디) 
	@PostMapping("/bookmark")
	public void bookmark() {
		
	}
	
	
	// 최신순(게시글등록일시) 6개씩 가져오기 (int 앤드포인트) 
	
	// 기술스택에 맞는 최신순 게시글 가져오기 
	
	// 포지션에 맞는 최신순 게시글 가져오기 
	

	
	
	
	
}
