package com.smhrd.coco.controller;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.service.BoardService;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	
	//작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postSaveInfor(@ModelAttribute TB_BOARD board, TB_BOARD_SKILL skill, TB_BOARD_IMG img) {

		System.out.println("회원 아이디: " + board.getCUST_ID());
		System.out.println("모집인원: " + board.getBOARD_MEMBERS());
		System.out.println("진행기간: " + board.getBOARD_PERIOD());
		System.out.println("시작일: " + board.getBOARD_DEADLINE());
		System.out.println("글제목: " + board.getBOARD_TITLE());
		System.out.println("글내용: " + board.getBOARD_CONTENT());	
		System.out.println("오픈톡 링크: " + board.getBOARD_OPENTALK());
		System.out.println("포지션 : " + board.getBOARD_POSITION());
		System.out.println("프로젝트 제목 : " + board.getPRO_TITLE());	
		System.out.println("화상회의 링크 : " + board.getPRO_LINK());
		System.out.println("프로젝트 이미지 : " + board.getPRO_IMG());
		System.out.println("기술스택 : " + skill.getSKILL_NAME());
		System.out.println("이미지 : " + img.getBOARD_IMG());
		System.out.println("뷰 : " + board.getBOARD_VIEWS());
		
		//진행기간 일수로 바꿔서 저장하기
		String period = board.getBOARD_PERIOD();
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
		board.setBOARD_PERIOD(d_day);
		//진행기간 일수로 바꿔서 저장하기 --끝--

		
		TB_BOARD saveBoard = new TB_BOARD(board.getCUST_ID(), board.getBOARD_TITLE(), board.getBOARD_MEMBERS(), board.getBOARD_PERIOD(), 
				board.getBOARD_DEADLINE(), board.getBOARD_OPENTALK(), board.getBOARD_CONTENT(), board.getBOARD_VIEWS(), board.getBOARD_POSITION(),
				board.getPRO_TITLE(), board.getPRO_IMG(), board.getPRO_LINK());
		
		//TB_BOARD 정보 저장
		int cnt1 = service.postSaveBoard(saveBoard);
		
		
		
		//TB_BOARD_SKILL테이블에 for문 돌려서 스킬 저장하기
		String skillPeriod = skill.getSKILL_NAME();
		String[] skillArray = skillPeriod.split(",");
		
		TB_BOARD_SKILL SaveSkill = null;
		
		System.out.println("보드번호 : "+saveBoard.getBOARD_ID());
		
		int cnt2=0;
		
		for(int i=0; i<skillArray.length; i++) {
			
			SaveSkill = new TB_BOARD_SKILL(saveBoard.getBOARD_ID(), skillArray[i]);
			System.out.println(skillArray[i] );
			
			cnt2 = service.postSaveSkill(SaveSkill);
		}
		

		
//    	TB_BOARD_IMG img = new TB_BOARD_IMG(null, null, map.get("BOARD_IMG"));



		if (cnt1>0 && cnt2>0) {
			System.out.println("DB 저장 성공");
			return 1;
		} else {
			System.out.println("DB 저장 실패");
			return 0;
		}
		
		
		
		
	}
	
	
	//선택한 게시글 내용 보내기
	

}
