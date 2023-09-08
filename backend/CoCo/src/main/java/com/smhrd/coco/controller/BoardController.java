package com.smhrd.coco.controller;

import java.time.LocalDate;
import java.time.Period;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_REQUIRED_SKILL;
import com.smhrd.coco.service.BoardService;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	
	//작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postSaveInfor(@RequestBody Map<String, String> map) {
		
		System.out.println("회원 아이디: " + map.get("CUST_ID"));
		System.out.println("모집인원: " + map.get("BOARD_MEMBERS"));
		System.out.println("진행기간: " + map.get("BOARD_PERIOD"));
		System.out.println("시작일: " + map.get("BOARD_DEADLINE"));
		System.out.println("글제목: " + map.get("BOARD_TITLE"));
		System.out.println("글내용: " + map.get("BOARD_CONTENT"));	
		System.out.println("오픈톡 링크: " + map.get("BOARD_OPENTALK"));
		System.out.println("역할구분 : " + map.get("PROJECT_ROLE"));
		System.out.println("프로젝트 제목 : " + map.get("PRO_TITLE"));	
		System.out.println("화상회의 링크 : " + map.get("PRO_LINK"));
		System.out.println("프로젝트 이미지 : " + map.get("PRO_IMG"));
		System.out.println("기술스택 : " + map.get("SKILL_ID"));
		System.out.println("이미지 : " + map.get("BOARD_IMG"));
		
		//진행기간 일수로 바꿔서 저장하기
		String period = map.get("BOARD_PERIOD");
		String[] day = period.split("~");
		
		String firstDate = day[0];
		String secondDate = day[1];
		
		String[] start = firstDate.split("/");
		int year1 = Integer.parseInt(start[0]);
		int month1 = Integer.parseInt(start[1]);
		int day1 = Integer.parseInt(start[2]);
		
		String[] end = secondDate.split("/");
		int year2 = Integer.parseInt(end[0]);
		int month2 = Integer.parseInt(end[1]);
		int day2 = Integer.parseInt(end[2]);
		
		LocalDate startDate = LocalDate.of(year1, month1, day1);
		LocalDate endDate = LocalDate.of(year2, month2, day2);

		Period per = Period.between(startDate, endDate);
		System.out.println(per.getDays());
		String d_day = per.getDays()+"";
		
		map.put("BOARD_PERIOD", d_day);

		TB_BOARD board = new TB_BOARD(map.get("CUST_ID"), map.get("BOARD_TITLE"), map.get("BOARD_MEMBERS"), map.get("BOARD_PERIOD"), 
				map.get("BOARD_DEADLINE"), map.get("BOARD_OPENTALK"), map.get("BOARD_CONTENT"), 0, map.get("PROJECT_ROLE"), 
				map.get("PRO_TITLE"), map.get("PRO_LINK"), map.get("PRO_IMG"));
		
		//TB_BOARD 정보 저장
		int cnt1 = service.postSaveBoard(board);
		
		System.out.println("asdfsadfas  "+board.getBOARD_PERIOD());
		
		//TB_REQUIRED_SKILL 보드에 스킬이름을 가지고 스킬번호 찾아오기
		
		
//		TB_REQUIRED_SKILL skill = new TB_REQUIRED_SKILL(null, board.getBOARD_ID(), null);
		
//    	TB_BOARD_IMG img = new TB_BOARD_IMG(null, null, map.get("BOARD_IMG"));

		
		
		//TB_REQUIRED_SKILL 정보 저장
//		int cnt2 = service.postSaveSkill(skill);
		
		//TB_BOARD_IMG 정보저장
//		int cnt3 = service.postSaveImg(img);

		if (cnt1>0) {
			System.out.println("DB 저장 성공");
			return 1;
		} else {
			System.out.println("DB 저장 실패");
			return 0;
		}
		
		
		
		
	}
	
	
	//선택한 게시글 내용 보내기
	

}
