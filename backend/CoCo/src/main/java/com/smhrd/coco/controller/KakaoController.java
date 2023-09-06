package com.smhrd.coco.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.service.KakaoService;



@RestController // 데이터를 반환하는 컨트롤러
@CrossOrigin("http://localhost:3000")
public class KakaoController {

	@Autowired // 의존성 주입
	private KakaoService service;

	// 로그인
	@GetMapping("/kakaologin")
	public Map<String, Object> kakaoLogin(@RequestParam String code) {

		// code값 통해서 카카오 이메일 가져오기
		String CUST_ID = service.kakaoEmail(code);

		// 카카오 이메일 조회
		int selectEmail = service.selectEmail(CUST_ID);

		// 이미지경로 가져오기
		String CUST_IMG = service.img(CUST_ID);
		
		Map<String, Object> data = new HashMap<>();
		
		if (selectEmail == 0) { // 회원가입 : 저장되지 않은 이메일 , 이미지 "0"
			System.out.println("DB에없는 이메일 ");
			data.put("CUST_ID", CUST_ID);
			data.put("CUST_IMG", "0");
		} else { // 로그인 : 이메일, 이미지
			System.out.println("DB에있는 이메일 ");
			data.put("CUST_ID", CUST_ID);
			data.put("CUST_IMG", CUST_IMG);
			System.out.println();
		}
		return data;
	}

	// 첫 로그인 기본 정보 DB에 저장
	@PostMapping("/firstlogin")
	public @ResponseBody int firstLogin(@RequestBody Map<String, String> map) {

		System.out.println("아이디 : " + map.get("CUST_ID"));
		System.out.println("닉네임 : " + map.get("CUST_NICK"));
		System.out.println("경력 : " + map.get("CUST_CAREER"));
		System.out.println("기술 : " + map.get("SKILL_NAME"));

		TB_CUST cust = new TB_CUST
				(map.get("CUST_ID"), map.get("CUST_NICK"), map.get("CUST_CAREER"), null, null, map.get("SKILL_NAME"));
		
	
		
		int cnt = service.firstLogin(cust);

		if (cnt > 0) {
			System.out.println("DB 저장 성공");
			return 1;
		} else {
			System.out.println("DB 저장 실패");
			return 0;
		}

	}

}