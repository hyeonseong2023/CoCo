package com.smhrd.coco.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.mapper.CustMapper;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;

@Service
public class CustService {

	@Autowired
	private CustMapper mapper;


	//마이페이지 (기본정보, 포트폴리오) 
	public JSONArray myPage(Map<String, String> map) {
		
		String cust_id = map.get("cust_id");

		// 회원 테이블(TB_CUST)
		List<TB_CUST> cust = mapper.mypageCust(cust_id);

		// 포트폴리오 테이블(TB_PF)
		List<TB_PF> pf = mapper.mypagePf(cust_id);	
		
		// 한 곳에 담아 보내기
		JSONArray jsonArray = new JSONArray();

		JSONObject obj = new JSONObject();
		obj.put("TB_CUST", cust);
		obj.put("TB_PF", pf);
		jsonArray.add(obj);		
	
		return jsonArray; 
	}
	
	// 마이페이지(프로젝트)
	public JSONArray mypageProject(Map<String, String> map) {
		
		// 프론트에서 아이디(CUST_ID)를 받아오기
		String cust_id = map.get("cust_id");

		// 조인 조건 : 게시글 번호(BOARD_ID)
		// 응모 테이블(TB_APPLY) & 게시글 테이블(TB_BOARD)
		List<TB_BOARD> project = mapper.mypageProject(cust_id);

		// 한 곳에 담아 보내기
		JSONArray jsonArray = new JSONArray();

		JSONObject obj = new JSONObject();
		obj.put("PROJECT", project);

		jsonArray.add(obj);

		return jsonArray;		
	}

	// 마이페이지(수정하기 페이지로 이동)
	public JSONObject updatePage(Map<String, String> map) {
		
		String cust_id = map.get("cust_id");

		// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는 정보 가져오기
		TB_CUST cust = mapper.updatePage(cust_id);

		// 한 곳에 담아 보내기
		JSONObject obj = new JSONObject();
		obj.put("cust", cust);
		
		return obj;

	}

	// 마이페이지(수정하기 버튼)
	public int userInfoUpdate(TB_CUST cust, MultipartFile file) {
		
		
		String cust_id  = cust.getCust_id();
		String cust_nick = cust.getCust_nick();
		String cust_career = cust.getCust_career(); 
		String cust_position = cust.getCust_position(); 
		String cust_git = cust.getCust_git(); 
		
		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
		
		//이미지 file -> transferTo 통해 저장(지정된 경로에) 
		try {
			file.transferTo(new File(newFileName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		TB_CUST addCust = new TB_CUST(cust_id, cust_nick, cust_career, cust_position, newFileName, cust_git);

		return mapper.userInfoUpdate(addCust);
		
	}
	
	// 포트폴리오 추가하기
	public int pfAdd(@RequestBody Map<String, String> map) {
		
		// 회원 아이디, 포트폴리오제목, 파일경로
		String cust_id = map.get("cust_id"); 
		String pf_title = map.get("pf_title"); 
		String pf_path = map.get("pf_path"); 
		
		TB_PF pf = new TB_PF (null, cust_id, pf_title, pf_path); 
		
		return mapper.pfAdd(pf); 
	}
	
	// 포트폴리오 title 수정 
	public int pfTitle(@RequestBody Map<String, Object> map) {
		
		// 포트폴리오번호, 회원아이디, 포트폴리오제목 
		Integer pf_id = (Integer)map.get("pf_id"); 
		String cust_id = (String)map.get("cust_id"); 
		String pf_title = (String)map.get("pf_title"); 
		
		TB_PF pf = new TB_PF(pf_id, cust_id, pf_title); 
		
		return mapper.pfTitle(pf); 
		
	}
	
	// 포트폴리오 삭제하기 
	public int pfDelete(@RequestBody Map<String, Object> map) {
		
		// 포트폴리오번호
		Integer pf_id = (Integer)map.get("pf_id"); 

		return mapper.pfDelete(pf_id); 
	}

}
