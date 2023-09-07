package com.smhrd.coco.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;
import com.smhrd.coco.service.CustService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController // 데이터를 반환하는 컨트롤러
@CrossOrigin("http://localhost:3000")
public class CustController {

	@Autowired
	private CustService service;

	@PostMapping("/mypage")
	public @ResponseBody void myPage(@RequestBody Map<String, String> map) {

		// 프론트에서 아이디(CUST_ID)를 받아오기
		System.out.println("프론트에서 받아온 id값 : " + map.get("CUST_ID"));
		System.out.println();
		String CUST_ID = map.get("CUST_ID");

		// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는
		// 닉네임(CUST_NICK), 경력(CUST_CAREER), 깃허브링크(CUST_GIT), 직군 포지션(CUST_ROLE) 가져오고
		List<TB_CUST> cust = service.mypageCust(CUST_ID);

		for (TB_CUST custItem : cust) {
			String CUST_NICK = custItem.getCUST_NICK();
			String CUST_CAREER = custItem.getCUST_CAREER();
			String CUST_GIT = custItem.getCUST_GIT();
			String CUST_ROLE = custItem.getCUST_ROLE();

			System.out.println("<TB_CUST 테이블>");
			System.out.println("CUST_NICK: " + CUST_NICK);
			System.out.println("CUST_CAREER: " + CUST_CAREER);
			System.out.println("CUST_GIT: " + CUST_GIT);
			System.out.println("CUST_ROLE: " + CUST_ROLE);
			System.out.println();
		
		}
		
		// 포트폴리오 테이블(TB_PF)에서 아이디(CUST_ID)에 맞는
		// 포트폴리오 제목(PF_TITLE), 파일경로(PF_PATH) 가져오고
		List<TB_PF> pf = service.mypagePf(CUST_ID);
		
		for (TB_PF pfItem : pf) {
			String PF_TITLE = pfItem.getPF_TITLE(); 
			String PF_PATH = pfItem.getPF_PATH(); 
			
			System.out.println("<TB_PF 테이블>");
			System.out.println("PF_TITLE : " + PF_TITLE);
			System.out.println("PF_PATH : " + PF_PATH);
			System.out.println();
		}

		// 조인 조건 : 게시글 번호(BOARD_ID) 
		// 응모 테이블(TB_APPLY)에서 아이디(CUST_ID) 수락여부(APPROVE_YN)가 Y인 것 중에서 
		// 게시글 테이블(TB_BOARD)와 프로젝트제목(PRO_TITLE)과 사진경로(PRO_IMG) 가져오기
        List<TB_BOARD> apply = service.mypageApply(CUST_ID); 
        
	    for(TB_BOARD applyItem : apply) {
	    	String PRO_TITLE = applyItem.getPRO_TITLE(); 
	    	String PRO_IMG = applyItem.getPRO_IMG(); 
	    	
	    	System.out.println("<TB_BOARD 테이블>");
	    	System.out.println("PRO_TITLE : " + PRO_TITLE);
	    	System.out.println("PRO_IMG : " + PRO_IMG );
	    	System.out.println();
	    }
		
		
		// 한 곳에 담아 보내기
		// 닉네임(CUST_NICK), 경력(CUST_CAREER), 깃허브링크(CUST_GIT), 직군 포지션(CUST_ROLE)
		// 포트폴리오 제목(PF_TITLE), 파일경로(PF_PATH), 포트폴리오 제목(PF_TITLE), 파일경로(PF_PATH)
		// 프로젝트 제목(PRO_TITLE), 사진경로(PRO_IMG)


	}

	
}
