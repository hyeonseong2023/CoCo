package com.smhrd.coco.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

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

	// 작성한 게시글 정보 DB저장
	@PostMapping("/postsaveinfor")
	public @ResponseBody int postSaveInfor(// @RequestPart(value = "BOARD_IMG", required = false) MultipartFile file,
			@ModelAttribute TB_BOARD board, TB_BOARD_SKILL skill) {

		System.out.println("period :" + board.getBoard_period());

		// TB_BOARD 정보 저장
		int cnt1 = service.postSaveBoard(board);

		// TB_BOARD_SKILL테이블에 for문 돌려서 스킬 저장하기
		String[] skillArray = skill.getSKILL_NAME().split(",");

		int cnt2 = skillArray.length;

		for (int i = 0; i < skillArray.length; i++) {
			int result = service.postSaveSkill(skillArray[i], board.getBoard_id());
			if (result > 0) {
				cnt2--;
			}
		}
		
		//TB_BOARD_IMG img = setBoardImg(file, board.getBoard_id());
		//int cnt3 = service.postSaveImg(img);
		
		//게시글 작성시 APPLY 게시판 응모여부에 H(호스트)로 저장하기
		int cnt4 = service.postSaveApply(board.getBoard_id(), board.getCust_id());
		
		
		// 게시글 board, skill, img 테이블에 각각 저장 성공실패시
		if (cnt1 > 0 && cnt2 == 0 && cnt4>0// && cnt3 > 0
				) {
			System.out.println("DB 저장 성공");
			return 1;
		} else {
			System.out.println("DB 저장 실패");
			return 0;
		}
	}

	// 수정한 게시글 DB 업데이트
	@PostMapping("/postupdateinfor")
	public @ResponseBody int postUpdateInfor(// @RequestPart(value = "BOARD_IMG", required = false) MultipartFile file,
			@ModelAttribute TB_BOARD board, TB_BOARD_SKILL skill) {
		
		int board_id = board.getBoard_id();

		// TB_BOARD 정보 저장
		int cnt1 = service.postUpdateBoard(board);

		//TB_BOARD_SKILL테이블에 스킬 삭제후 저장하기
		String[] skillArray = skill.getSKILL_NAME().split(",");
		int cnt2 = skillArray.length;
		int result1 = service.postDeleteSkill(board_id);
		
		if(result1>0) {
			for (int i = 0; i < skillArray.length; i++) {
				int result2 = service.postSaveSkill(skillArray[i], board.getBoard_id());
				if (result2 > 0) {
					cnt2--;
				}
			}	
		}

//		TB_BOARD_IMG img = setBoardImg(file, board_id);
//		int cnt3 = service.postUpdateImg(img, board_id);

		// 게시글 board, skill, img 테이블에 각각 저장 성공실패시
		if (cnt1 > 0 && cnt2 > 0// && cnt3 > 0
				) {
			System.out.println("DB 업데이트 성공");
			return 1;
		} else {
			System.out.println("DB 업데이트 실패");
			return 0;
		}
	}

	// 선택한 게시글 내용 보내기
	@GetMapping("/selectpostviews/{board_id}")
	public JSONArray selectPostViews(@PathVariable("board_id") int board_id,
			@RequestParam(value = "cust_id", required = false) String cust_id) {

		System.out.println("boardid: " + board_id + "custid: " + cust_id);
		return service.selectPostViews(board_id, cust_id);

	}

	// 게시글에 지원하면 APPLY 테이블에 정보 추가-> NOTICE 테이블에 정보추가 -> 게시글 작성자에게 지원자 프로필사진, 닉네임, 지원내용 보내기.
	@PostMapping("/postApply")
	public int postApply(@RequestParam("board_id") int board_id, @RequestParam("loginUserId") String sender_id, 
						  @RequestParam("createCustId") String receiver_id) {

		//APPLY 테이블에 정보 추가(board_id, 지원하는 유저 아이디)
		int cnt1 = service.postApply(board_id, sender_id);
		
		//NOTICE 테이블에 정보추가(알림받는 게시글작성자 receiver_id, board_id, 알림 보내는 회원 sender_id)
		int cnt2 = service.postApplyNotice(board_id, receiver_id, sender_id);
		
		if (cnt1 < 0 && cnt2 < 0) {
			System.out.println("게시글 지원 실패");
			return 0;
		} else {
			System.out.println("게시글 지원 성공");
			return 1;
		}
			
	}
//	//알림보내기. 알림발송자 프로필사진, 닉네임, 알림내용, 전송일시 보내기.(알림 받는 cust_id)
//	@PostMapping("/notifications")
//	public JSONArray notifications(@RequestParam("cust_id") String cust_id) {
//		
//		return service.notifications(cust_id);
//		
//	}
//	
	// 게시글 지원취소하기
	@PostMapping("/unPostApply/")
	public int unPostApply(@RequestParam("board_id") int board_id, @RequestParam("cust_id") String cust_id) {
		System.out.println("게시글 취소" + board_id + cust_id);

		int cnt = service.unPostApply(board_id, cust_id);
		System.out.println("지원취소" + cnt);

		if (cnt > 0) {
			System.out.println("지원취소 실패");
			return 1;
		} else {
			System.out.println("지원취소 성공");
			return 0;
		}
	}

//	// 게시글 지원취소하기
//	@GetMapping("/unPostApply/{board_id}/{cust_id}")
//	public int unPostApply(@PathVariable("board_id") int board_id, @PathVariable("cust_id") String cust_id) {
//		System.out.println("게시글 취소" + board_id + cust_id);
//
//		int cnt = service.unPostApply(board_id, cust_id);
//		System.out.println("지원취소" + cnt);
//
//		if (cnt > 0) {
//			System.out.println("지원취소 실패");
//			return 1;
//		} else {
//			System.out.println("지원취소 성공");
//			return 0;
//		}
//	}

	// 프로젝트 링크 보내기(없는지 확인하여 있다면 생성)
	@GetMapping("/webrtc")
	public String getOrCreateProLink(@RequestParam("board_id") int board_id) {
		return service.getOrCreateProLink(board_id);
	}

	// 게시글 모집 마감
	@GetMapping("/postdeadline/{board_id}/{board_deadline}")
	public int deadline(@PathVariable("board_id") int board_id) {

		int cnt = service.postDeadline(board_id);

		if (cnt > 0) {
			System.out.println("게시글 모집 마감 성공");
		} else {
			System.out.println("게시글 모집 마감 실패!!");
		}

		return cnt;
	}

	// 게시글 삭제 클릭시 board_id => admin 관리자로 변경
	@GetMapping("/postdelete/{board_id}")
	public int postDelete(@PathVariable("board_id") int board_id) {

		int cnt = service.postDelete(board_id);

		if (cnt > 0) {
			System.out.println("게시글 삭제 성공");
		} else {
			System.out.println("게시글 삭제 실패!!");
		}
		return cnt;

	}
	

	
	
	
	
	///////////////////////////////////////메서드//////////////////////////////////////////////////////////
	
	public TB_BOARD_IMG setBoardImg(MultipartFile file, int board_id) {
		// TB_BOARD_IMG 테이블에 이미지 저장하기
		TB_BOARD_IMG img = new TB_BOARD_IMG();

		// 파일이 제공되었는지 확인후 이미지 제공이면 지정된 경로에 저장, 없으면 null 값 저장
		if (file != null && !file.isEmpty()) {
			String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
			try {
				// 이미지 파일을 저장합니다.
				file.transferTo(new File(newFileName));
				img.setBOARD_IMG(newFileName);
				img.setBoard_id(board_id);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("board_id: "+board_id);
		System.out.println(img.getBoard_id());
		return img;
	}

}