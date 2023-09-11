package com.smhrd.coco.controller;

import java.util.Map;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;
import com.smhrd.coco.service.CustService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;

@RestController // 데이터를 반환하는 컨트롤러
@CrossOrigin("http://localhost:3000")
public class CustController {

	@Autowired
	private CustService service;

	// 마이페이지(기본정보, 포트폴리오)
	@PostMapping("/mypage")
	public JSONArray myPage(@RequestBody Map<String, String> map) {
		return service.myPage(map);
	}

	// 마이페이지(프로젝트)
	@PostMapping("/project")
	public JSONArray project(@RequestBody Map<String, String> map) {
		return service.mypageProject(map);
	}

	// 마이페이지(수정하기 페이지로 이동)
	@PutMapping("/updatepage")
	public JSONObject updatePage(@RequestBody Map<String, String> map) {
		return service.updatePage(map);
	}

	// 마이페이지(수정하기)
	@PutMapping("/userinfoupdate") // form-data 
	public void userInfoUpdate(TB_CUST cust , @RequestPart("CUST_IMG") MultipartFile file) {
		int update = service.userInfoUpdate(cust, file);
	}

	// 포트폴리오 추가하기
	@PostMapping("/pfadd")
	public void pfAdd(@RequestBody Map<String, String> map) {
		int pfAdd = service.pfAdd(map);
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

}
