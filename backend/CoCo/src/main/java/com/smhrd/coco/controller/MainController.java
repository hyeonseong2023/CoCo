package com.smhrd.coco.controller;

import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.service.MainService;

@RestController
@CrossOrigin("http://localhost:3000")
public class MainController {

	@Autowired
	private MainService service;
	
	// 프로필 이미지 보내기 
	@GetMapping("/profileimg")
    public JSONObject profileImg(@RequestParam("cust_id") String cust_id) {  
		return service.profileImg(cust_id); 
	}
	// 조회수 증가
	@GetMapping("/views")
	public void views(@RequestParam("board_id") int board_id) {
		int increaseViews = service.increaseViews(board_id);
	}

	// 인기글(조회수기반) 가져오기
	@GetMapping("/popularlist")
	public JSONArray main() {
		return service.popularList();
	}

	// 북마크 저장
	@PostMapping("/bookmarkcheck")
	public void bookmarkCheck(@RequestBody TB_BOOKMARK book) { // VO 타입으로 가져올때는 필드명이 대문자 이면 안됨!
		int bookmarkCheck = service.bookmarkCheck(book);
	}

	// 북마크 해제
	@PostMapping("/unbookmark")
	public void unBookmark(@RequestBody TB_BOOKMARK book) {
		int unBookmark = service.unBookmark(book);
	}

	// 북마크된 게시글만 불러오기
	@GetMapping("/bookmark")
	public JSONArray bookmarkList(@RequestParam("cust_id") String cust_id) {
		return service.bookmarkList(cust_id);
	}

	// 게시글 불러오기
	// 기술스택명 = null 포지션 = null 엔드포인트 : 1 최신순 게시글 가져오기
	// 기술스택명 = React 포지션 = null 엔드포인트 : 1 기술스택명에 맞는 최신순 게시글 가져오기
	// 기술스택명 = null, 포지션 = 백엔드 엔드포인트 : 1 포지션에 맞는 최신순 게시글 가져오기
	// 기술스택명 = React 포지션 = 백엔드 엔드포인트 : 1 기술스택과 포지션에 맞는 최신순 게시글 가져오기
	@PostMapping("/select")
	public JSONArray selectList(@RequestBody Map<String, Object> map) {
		return service.selectList(map);
	}

	// 지원한 게시글 보기
	@GetMapping("/apply")
	public JSONArray applyList(@RequestParam("cust_id") String cust_id) {
		return service.applyList(cust_id);
	}

	// 내가 작성한 글 보기
	@GetMapping("/writelist")
	public JSONArray writelist(@RequestParam("cust_id") String cust_id) {
		return service.writeList(cust_id);
	}
}