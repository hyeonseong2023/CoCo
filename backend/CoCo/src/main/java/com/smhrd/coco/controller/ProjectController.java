package com.smhrd.coco.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.service.BoardService;
import com.smhrd.coco.service.ProjectService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProjectController {
	
	@Autowired
	private ProjectService service;
	
	//프로젝트 응모 수락여부 Y, H인 멤버들 닉네임, 프로필사진 정보 보내기
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
	
	//프로젝트 명, 프로젝트 이미지 보내기. 이미지 없으면 null 값으로 (board_id)
	@PostMapping("/projectinfo")
	public TB_BOARD projectInfo(@RequestBody JSONObject obj) {
		TB_BOARD projectInfo = service.projectInfo((Integer)obj.get("board_id"));
		return projectInfo;
	}
	
	//프로젝트 명, 프로젝트 이미지 업데이트 (board_id)
	@PostMapping("/projectinfoupdate")
	public int projectInfoUpdate(@RequestParam("board_id") int board_id, @RequestParam("pro_title") String pro_title, 
									@RequestPart(value = "pro_img", required = false) MultipartFile file) {
	
		TB_BOARD pro_img = new TB_BOARD();

		// 파일이 제공되었는지 확인후 이미지 제공이면 지정된 경로에 저장, 없으면 null 값 저장
		if (file != null && !file.isEmpty()) {
			String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
			try {
				// 이미지 파일을 저장합니다.
				file.transferTo(new File(newFileName));
				pro_img.setPro_img(newFileName);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
		}
		
		int cnt = service.projectInfoUpdate(pro_img.getPro_img(), board_id, pro_title);

		return 0;
	}

	// 알림 닉네임, 프로필사진 불러오기
		@PostMapping("/notification")
		public List<TB_CUST> getNotiList(@RequestBody JSONObject obj){
			List<String> list =  (List<String>) obj.get("notiList");
			return service.getNotiList(list);
		}
	

}

