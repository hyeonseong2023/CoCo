package com.smhrd.coco.controller;

import java.util.Map;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;
import com.smhrd.coco.service.CustService;

import org.springframework.web.bind.annotation.RequestBody;

@RestController // 데이터를 반환하는 컨트롤러
@CrossOrigin("http://localhost:3000")
public class CustController {

	@Autowired
	private CustService service;

	// 마이페이지(기본정보, 포트폴리오)
	@PostMapping("/mypage")
	public JSONArray myPage(@RequestBody Map<String, String> map) {

		// 프론트에서 아이디(CUST_ID)를 받아오기
		String CUST_ID = map.get("CUST_ID");

		// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는
		// 닉네임(CUST_NICK), 경력(CUST_CAREER), 깃허브링크(CUST_GIT), 직군 포지션(CUST_ROLE) 가져오고
		List<TB_CUST> cust = service.mypageCust(CUST_ID);

		// 포트폴리오 테이블(TB_PF)에서 아이디(CUST_ID)에 맞는
		// 포트폴리오 제목(PF_TITLE), 파일경로(PF_PATH) 가져오고
		List<TB_PF> pf = service.mypagePf(CUST_ID);

		// 한 곳에 담아 보내기
		JSONArray jsonArray = new JSONArray();

		JSONObject obj = new JSONObject();
		obj.put("TB_CUST", cust);
		obj.put("TB_PF", pf);

		jsonArray.add(obj);

		return jsonArray;

	}

	// 마이페이지(프로젝트)
	@PostMapping("/project")
	public JSONArray project(@RequestBody Map<String, String> map) {

		// 프론트에서 아이디(CUST_ID)를 받아오기
		String CUST_ID = map.get("CUST_ID");

		// 조인 조건 : 게시글 번호(BOARD_ID)
		// 응모 테이블(TB_APPLY)에서 아이디(CUST_ID) 수락여부(APPROVE_YN)가 Y인 것 중에서
		// 게시글 테이블(TB_BOARD)와 프로젝트제목(PRO_TITLE)과 사진경로(PRO_IMG) 가져오기
		List<TB_BOARD> project = service.mypageProject(CUST_ID);

		// 한 곳에 담아 보내기
		JSONArray jsonArray = new JSONArray();

		JSONObject obj = new JSONObject();
		obj.put("PROJECT", project);

		jsonArray.add(obj);

		return jsonArray;

	}

	// 마이페이지(연필 버튼)
	@PostMapping("/updatepage")
	public JSONObject updatePage(@RequestBody Map<String, String> map) {

		// 프론트에서 아이디(CUST_ID)를 받아오기
		String CUST_ID = map.get("CUST_ID");
		System.out.println("CUST_ID : " + map.get("CUST_ID"));

		// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는 정보 가져오기
		TB_CUST cust = service.updatePage(CUST_ID);

		// 한 곳에 담아 보내기
		JSONObject obj = new JSONObject();
		obj.put("CUST", cust);

		return obj;

	}

	// 마이페이지(수정하기 버튼)
	@PostMapping("/update")
	public int update(@RequestBody Map<String, String> map) {

		String CUST_ID = map.get("cust_ID");
		String CUST_NICK = map.get("cust_NICK");
		String CUST_CAREER = map.get("cust_CAREER");
		String CUST_IMG = map.get("cust_IMG");
		String CUST_GIT = map.get("cust_GIT");
		String CUST_ROLE = map.get("cust_ROLE");

		TB_CUST cust = new TB_CUST(CUST_ID, CUST_NICK, CUST_CAREER, CUST_IMG, CUST_GIT, CUST_ROLE);
		System.out.println(cust.getCUST_GIT());
		int update = service.update(cust);

		if (update > 0) { // DB 저장 성공 
			return 1;
		} else {
			return 0;
		}

	}

}
