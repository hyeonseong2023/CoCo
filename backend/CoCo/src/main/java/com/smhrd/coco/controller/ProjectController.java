package com.smhrd.coco.controller;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.service.BoardService;
import com.smhrd.coco.service.ProjectService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProjectController {
	
	@Autowired
	private ProjectService service;
	
	//프로젝트 응모 수락여부 Y인 멤버들 닉네임, 프로필사진 정보 보내기
	@PostMapping("/projectmemberlist")
	public List<TB_CUST> projectMemberList(@RequestBody JSONObject obj) {
		List<TB_CUST> array = service.projectMemberList((Integer)obj.get("board_id"));
		return array;
	}
	
	//프로젝트 응모 수락여부 N인 유저 아이디, 닉네임, 프로필사진
	@PostMapping("projectapplylist")
	public List<TB_CUST> projectApplyList(@RequestBody JSONObject obj){
		List<TB_CUST> array = service.projectApplyList((Integer)obj.get("board_id"));
		return array;
	}
	
	//응모여부 N -> Y 로 바꾸기 (board_id, cust_id)
	@PostMapping("projectaccept")
	public int projectAccept(@RequestBody JSONObject obj) {
		int cnt = service.projectAccept((Integer)obj.get("board_id"), (String)obj.get("cust_id"));
		return cnt;
	}
	
	//프로젝트 응모 거절로 응모테이블에서 삭제하기 (board_id, cust_id)
	@PostMapping("applydecline")
	public int applyDecline(@RequestBody JSONObject obj) {
		int cnt = service.applyDecline((Integer)obj.get("board_id"), (String)obj.get("cust_id"));
		return cnt;
	}

	

}
