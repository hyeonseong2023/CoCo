package com.smhrd.coco.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.service.BoardService;

import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;

@RestController
@CrossOrigin("http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	
	//작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postSaveInfor(@RequestPart("BOARD_IMG") MultipartFile file, @ModelAttribute TB_BOARD board, TB_BOARD_SKILL skill) {
		
		//진행기간 일수로 바꿔서 저장하기
		String period = board.getBoard_period();
		System.out.println("period !!!!!!"+period);
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
		String d_day = per.getDays()+"";
		board.setBoard_period(d_day);
		//진행기간 일수로 바꿔서 저장하기 --끝--

		
		TB_BOARD saveBoard = new TB_BOARD(board.getCust_id(), board.getBoard_title(), board.getBoard_members(), board.getBoard_period(), 
				board.getBoard_deadline(), board.getBoard_openlink(), board.getBoard_content(), board.getBoard_views(), board.getBoard_position(),
				board.getBoard_title(), board.getPro_img(), board.getPro_link());
		
		//TB_BOARD 정보 저장
		int cnt1 = service.postSaveBoard(saveBoard);		
		
		
		//TB_BOARD_SKILL테이블에 for문 돌려서 스킬 저장하기
		String skillPeriod = skill.getSKILL_NAME();
		String[] skillArray = skillPeriod.split(",");
		
		TB_BOARD_SKILL SaveSkill = null;		
		int cnt2=0;
		
		for(int i=0; i<skillArray.length; i++) {			
			SaveSkill = new TB_BOARD_SKILL(saveBoard.getBoard_id(), skillArray[i]);			
			cnt2 = service.postSaveSkill(SaveSkill);
		}
		
		
		//TB_BOARD_IMG 테이블에 이미지 저장하기		
		TB_BOARD_IMG img = new TB_BOARD_IMG();
		
		String newFileName = UUID.randomUUID().toString()+file.getOriginalFilename();
		try {
			//이미지 file -> 저장(지정된 경로에)
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		img.setBOARD_IMG(newFileName);
		img.setBoard_id(saveBoard.getBoard_id());
		
		int cnt3 = service.postSaveImg(img);
		
		//게시글 board, skill, img 테이블에 각각 저장 성공실패시
		if (cnt1>0 && cnt2>0 && cnt3>0) {
			System.out.println("DB 저장 성공");
			return 1;
		} else {
			System.out.println("DB 저장 실패");
			return 0;
		}
	}
	
	
	//선택한 게시글 내용 보내기
	@GetMapping("/selectpostviews/{board_id}/{cust_id}")
	public JSONArray selectPostViews(@PathVariable("board_id")int board_id, @PathVariable("cust_id")String cust_id) {
		
		return service.selectPostViews(board_id, cust_id);
		
	}
	
	//게시글 수정된 정보 업데이트 하기
	//@PutMapping("/updatepost/{board_id}/{cust_id}")
	//public 
	
	
	
	

	
	
}
