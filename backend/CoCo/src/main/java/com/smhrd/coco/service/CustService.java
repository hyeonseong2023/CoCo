package com.smhrd.coco.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import com.smhrd.coco.mapper.CustMapper;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_CUST_SKILL;
import com.smhrd.coco.domain.TB_PF;

@Service
public class CustService {
	
	@Autowired
	private CustMapper mapper;

	// 마이페이지 (기본정보, 포트폴리오)
	public JSONObject myPage(String cust_id) {

		// 회원 테이블(TB_CUST)
		List<TB_CUST> cust = mapper.mypageCust(cust_id);
		
		JSONObject obj = new JSONObject();
		
		for( TB_CUST custItem : cust) {
			obj.put("CUST_NICK", custItem.getCUST_NICK()); 
			obj.put("CUST_CAREER", custItem.getCUST_CAREER());
			obj.put("CUST_POSITION", custItem.getCUST_POSITION());
			obj.put("CUST_IMG", custItem.getCUST_IMG());
			obj.put("CUST_IMG",custItem.getCUST_GIT()); 
			obj.put("CUST_GIT", custItem.getCUST_GIT());
		}

		// 포트폴리오 테이블(TB_PF)
		List<TB_PF> pf = mapper.mypagePf(cust_id);
		for( TB_PF pfItem : pf) {
			obj.put("PF_TITLE", pfItem.getPF_TITLE());
			obj.put("PF_PATH", pfItem.getPF_PATH());
		}
		
		// 조인 조건 : 게시글 번호(BOARD_ID)
		// 응모 테이블(TB_APPLY) & 게시글 테이블(TB_BOARD)
		List<TB_BOARD> project = mapper.mypageProject(cust_id);
		for(TB_BOARD pjItem : project) {
			obj.put("BOARD_ID", pjItem.getBoard_id());
		}
		
//		JSONArray skillArray = new JSONArray();		
		List<String> skillArray = new ArrayList<>(); 
		// 회원 스킬 
		List<TB_CUST_SKILL> custSkill = mapper.custSkill(cust_id); 
		for(TB_CUST_SKILL csItem : custSkill) {
			skillArray.add(csItem.getSKILL_NAME());
			
//			JSONObject skillObj = new JSONObject();
//			skillObj.put("SKILL_NAME", csItem.getSKILL_NAME());
//			skillArray.add(skillObj);
			
	
		}

		obj.put("SKILL_NAME",skillArray );
		// 한 곳에 담아 보내기
		
//		obj.put("TB_CUST", cust);
//		obj.put("TB_PF", pf);
//		obj.put("TB_BOARD",  project);
//		obj.put("TB_CUST_SKILL",  custSkill);
//		jsonArray.add(obj);

		return obj;
	}

	// 마이페이지(수정하기 페이지로 이동)
//	public JSONObject updatePage(String cust_id) {
//
//		// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는 정보 가져오기
//		TB_CUST cust = mapper.updatePage(cust_id);
//
//		// 한 곳에 담아 보내기
//		JSONObject obj = new JSONObject();
//		obj.put("cust", cust);
//
//		return obj;
//	}

	// 마이페이지(수정하기)
	public int userInfoUpdate(TB_CUST cust, MultipartFile file) {

		String cust_id = cust.getCUST_ID();
		String cust_nick = cust.getCUST_NICK();
		String cust_career = cust.getCUST_CAREER();
		String cust_position = cust.getCUST_POSITION();
		String cust_git = cust.getCUST_GIT();

		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();

		// 이미지 file -> transferTo 통해 저장(지정된 경로에)
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

		TB_PF pf = new TB_PF(null, cust_id, pf_title, pf_path);

		return mapper.pfAdd(pf);
	}

	// 포트폴리오 title 수정
	public int pfTitle(@RequestBody Map<String, Object> map) {

		// 포트폴리오번호, 회원아이디, 포트폴리오제목
		Integer pf_id = (Integer) map.get("pf_id");
		String cust_id = (String) map.get("cust_id");
		String pf_title = (String) map.get("pf_title");

		TB_PF pf = new TB_PF(pf_id, cust_id, pf_title);

		return mapper.pfTitle(pf);

	}

	// 포트폴리오 삭제하기
	public int pfDelete(@RequestBody Map<String, Object> map) {

		// 포트폴리오번호
		Integer pf_id = (Integer) map.get("pf_id");
		return mapper.pfDelete(pf_id);
	}
}