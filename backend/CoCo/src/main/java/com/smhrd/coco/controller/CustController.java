package com.smhrd.coco.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_CUST_SKILL;
import com.smhrd.coco.domain.TB_PF;
import com.smhrd.coco.service.CustService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController // 데이터를 반환하는 컨트롤러
public class CustController {

	@Autowired
	private CustService service;

	// 첫 로그인 기본 정보 DB 저장
	@PostMapping("/firstlogin")
	public int firstLogin(@RequestBody Map<String, String> map) {
		return service.firstLogin(map);
	}

	// 마이페이지(유저정보, 포트폴리오, 프로젝트 )
	@GetMapping("/mypage")
	public JSONObject myPage(@RequestParam("cust_id") String cust_id) {
		return service.myPage(cust_id);
	}

	// 마이페이지(수정하기)
	@PutMapping("/userinfoupdate") // form-data
	public @ResponseBody String userInfoUpdate(@RequestPart(required = false, value = "cust_img1") MultipartFile file,
			@ModelAttribute TB_CUST cust) {

		String newFileName = null ;
		if (file != null && !file.isEmpty()) {

			// 이미지 이름 저장
			newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
			cust.setCust_img(newFileName);

			try {
				// 이미지 file -> 저장(지정된 경로에)
				file.transferTo(new File(newFileName));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		// 이미지 기본정보 저장
		int update = service.userInfoUpdate(cust);

		System.out.println("뉴파일 네임 " + newFileName);
		if (update > 0) {
			System.out.println("마이페이지 기본정보 수정 - DB저장성공");
			return  newFileName ;
		} else {
			System.out.println("마이페이지 기본정보 수정 - DB저장실패");
			return "실패" ;
		}

	}

	// 포트폴리오 추가하기
	@PostMapping("/pfadd")
	public int pfAdd(@RequestParam("file") MultipartFile file, @ModelAttribute TB_PF pf) {

		// PDF file 기본정보 저장
		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
		pf.setPf_path(newFileName);

		try {
			// PDF file -> 저장(지정된 경로에)
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// 포트폴리오 정보 저장
		int pfAdd = service.pfAdd(pf);

		if (pfAdd > 0) {
			System.out.println("DB저장성공");
			return 1;
		} else {
			System.out.println("실패");
			return 0;
		}

	}

	// 포트폴리오 title 수정
	@PutMapping("/pftitle")
	public void pfTitle(@RequestBody Map<String, Object> map) {
		int pfTitle = service.pfTitle(map);
	}

	// 포트폴리오 삭제하기
	@DeleteMapping("/pfdelete")
	public void pfDelete(@RequestBody Map<String, Object> map) {
		int pfDelete = service.pfDelete(map);
	}
	
	// 회원탈퇴 
	@DeleteMapping("/deletecust")
	public void deleteCust(@RequestBody Map<String, String> map) {
		int deleteCust = service.deleteCust(map); 
	}
}