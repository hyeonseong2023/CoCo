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
import org.springframework.web.bind.annotation.RequestParam;
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
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	
	//작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postSaveInfor(@RequestPart("BOARD_IMG") MultipartFile file, @ModelAttribute TB_BOARD board, TB_BOARD_SKILL skill) {
		
	      System.out.println("회원 아이디: " + board.getCust_id());
	      System.out.println("모집인원: " + board.getBoard_members());
	      System.out.println("진행기간: " + board.getBoard_period());
	      System.out.println("시작일: " + board.getBoard_deadline());
	      System.out.println("글제목: " + board.getBoard_title());
	      System.out.println("글내용: " + board.getBoard_content());   
	      System.out.println("오픈톡 링크: " + board.getBoard_openlink());
	      System.out.println("포지션 : " + board.getBoard_position());
	      System.out.println("프로젝트 제목 : " + board.getPro_title());   
	      System.out.println("화상회의 링크 : " + board.getPro_link());
	      System.out.println("프로젝트 이미지 : " + board.getPro_img());
	      System.out.println("기술스택 : " + skill.getSKILL_NAME());
	      System.out.println("뷰 : " + board.getBoard_views());
	      
		
		TB_BOARD saveBoard = new TB_BOARD(board.getCust_id(), board.getBoard_title(), board.getBoard_members(), board.getBoard_period(), 
				board.getBoard_deadline(), board.getBoard_openlink(), board.getBoard_content(), board.getBoard_views(), board.getBoard_position(),
				board.getBoard_title(), board.getPro_img(), board.getPro_link());
		
		
		
		//TB_BOARD 정보 저장
		int cnt1 = service.postSaveBoard(saveBoard);		
		
		System.out.println("스킬이름:"+ skill.getSKILL_NAME());
		
		//TB_BOARD_SKILL테이블에 for문 돌려서 스킬 저장하기
		String skillPeriod = skill.getSKILL_NAME();
		String[] skillArray = skillPeriod.split(",");
		
		TB_BOARD_SKILL SaveSkill = null;		
		int cnt2=0;
		
		for(int i=0; i<skillArray.length; i++) {			
			SaveSkill = new TB_BOARD_SKILL(saveBoard.getBoard_id(), skillArray[i]);			
			int result = service.postSaveSkill(SaveSkill);
			if (result>0) {cnt2++;}
			
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
	
	//게시글에 지원하기
	@GetMapping("/postApply/{board_id}/{cust_id}")
	public int postApply(@PathVariable("board_id")int board_id, @PathVariable("cust_id")String cust_id) {
		System.out.println("게시글 지원"+ board_id + cust_id);
		
		int cnt = service.postApply(board_id, cust_id);
		System.out.println("게시글 지원"+cnt);
		
		if(cnt<0) {
			System.out.println("DB에 지원하기 정보저장 실패");
			return 0;
		}else {
			System.out.println("DB에 지원하기 정보저장");
			return 1;
		}
	}

	//게시글 지원취소하기
	@GetMapping("/unPostApply/{board_id}/{cust_id}")
	public int unPostApply(@PathVariable("board_id")int board_id, @PathVariable("cust_id")String cust_id) {
		System.out.println("게시글 취소"+ board_id + cust_id);
		
		int cnt = service.unPostApply(board_id, cust_id);
		System.out.println("지원취소"+cnt);
		
		if(cnt>0) {
			System.out.println("지원취소 실패");
			return 1;
		}else {
			System.out.println("지원취소 성공");
			return 0;
		}
	}

	//프로젝트 링크 보내기(없는지 확인하여 있다면 생성)
	@GetMapping("/webrtc")
	public String getOrCreateProLink(@RequestParam("board_id") int board_id) {
		return service.getOrCreateProLink(board_id);
	}

	
	
}
