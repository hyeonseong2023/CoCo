package com.smhrd.coco.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PROJECT;
import com.smhrd.coco.domain.TB_REQUIRED_SKILL;
import com.smhrd.coco.service.BoardService;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	
	//작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postsaveinfor(@RequestBody Map<String, String> map) {
		
		System.out.println("회원 아이디 : " + map.get("CUST_ID"));
		System.out.println("모집인원 : " + map.get("BOARD_MEMBERS"));
		System.out.println("진행기간	 : " + map.get("BOARD_PERIOD"));
		System.out.println("시작일	 : " + map.get("BOARD_DEADLINE"));
		System.out.println("포지션	 : " + map.get("PROJECT_ROLE"));
		System.out.println("글제목	 : " + map.get("BOARD_TITLE"));
		System.out.println("글내용		 : " + map.get("BOARD_CONTENT"));	
		System.out.println("오픈톡 링크: " + map.get("BOARD_OPENTALK"));
		System.out.println("역할구분  : " + map.get("PROJECT_ROLE"));
		
		System.out.println("기술스택		 : " + map.get("SKILL_ID"));
		System.out.println("이미지		 : " + map.get("BOARD_IMG"));
		System.out.println("프로젝트 번호	 : " + map.get("PRD_ID"));

		TB_BOARD board = new TB_BOARD(null, map.get("CUST_ID"), null, map.get("BOARD_TITLE"), map.get("BOARD_MEMBERS"), 
				map.get("BOARD_PERIOD"), map.get("BOARD_DEADLINE"), map.get("BOARD_OPENTALK"), map.get("BOARD_CONTENT"), 
				null, null, map.get("PROJECT_ROLE"));
		
		TB_REQUIRED_SKILL skill = new TB_REQUIRED_SKILL(null, null, null);
		
		TB_BOARD_IMG img = new TB_BOARD_IMG(null, null, map.get("BOARD_IMG"));
		
		TB_PROJECT project = new TB_PROJECT(null, null, null, null);

		
		//int cnt = service.postsaveinfor(board);

//		if (cnt > 0) {
//			System.out.println("DB 저장 성공");
//			return 1;
//		} else {
//			System.out.println("DB 저장 실패");
//			return 0;
//		}
		
		return 0;
		
	}
	
	
	//선택한 게시글 내용 보내기
	

}
