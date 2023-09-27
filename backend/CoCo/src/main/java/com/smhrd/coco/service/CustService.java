package com.smhrd.coco.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.smhrd.coco.mapper.CustMapper;
import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_CUST_SKILL;
import com.smhrd.coco.domain.TB_PF;

@Service
public class CustService {

	@Autowired
	private CustMapper mapper;

	// 첫 로그인 기본 정보 DB 저장
	public int firstLogin(Map<String, String> map) {
		TB_CUST cust = new TB_CUST(map.get("cust_id"), map.get("cust_nick"), map.get("cust_career"),
				map.get("cust_position"), map.get("cust_skill"));
		return mapper.firstLogin(cust);
	}

	// 이미지 체크 
	public int checkCustImg(String cust_id) {
		return mapper.checkCustImg(cust_id); 
	}
	
	
	// 마이페이지 (기본정보, 포트폴리오, 프로젝트)
	public JSONObject myPage(String cust_id) {
		System.out.println("cust_id :" + cust_id);
		
		// 회원 테이블(TB_CUST) - 기본정보
		TB_CUST cust = mapper.mypageCust(cust_id);
		
		JSONObject obj = new JSONObject();

		obj.put("CUST_ID", cust.getCust_id());
		obj.put("CUST_NICK", cust.getCust_nick());
		obj.put("CUST_CAREER", cust.getCust_career());
		obj.put("CUST_POSITION", cust.getCust_position());
		obj.put("CUST_GIT", cust.getCust_git());
		obj.put("CUST_SKILL", cust.getCust_skill());
		obj.put("CUST_LINK", cust.getCust_link());

		System.out.println("이미지" + cust.getCust_img());
		if (cust.getCust_img() != null) {
			// 이미지 변환
			ImageConverter<File, String> converter = new ImageToBase64();
			File file = new File("c:\\cocoImage\\" + cust.getCust_img());

			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			obj.put("CUST_IMG", fileStringValue);
		} else {
			obj.put("CUST_IMG", null);
		}

		// 포트폴리오 테이블(TB_PF)
		List<TB_PF> pf = mapper.mypagePf(cust_id);

		JSONArray PF_TABLE = new JSONArray();

		for (TB_PF pfItem : pf) {

			JSONObject pfobj = new JSONObject();
			pfobj.put("PF_ID", pfItem.getPf_id());
			pfobj.put("PF_TITLE", pfItem.getPf_title());

			// PDF 파일 변환
			File file1 = new File("c:\\cocoImage\\" + pfItem.getPf_path());

			try (FileInputStream fis = new FileInputStream(file1)) {
				byte[] pdfBytes = IOUtils.toByteArray(fis);
				String pdfBase64String = Base64.getEncoder().encodeToString(pdfBytes);
				pfobj.put("PF_PATH", pdfBase64String);
			} catch (IOException e) {
				e.printStackTrace();
			}
			PF_TABLE.add(pfobj);
		}

		obj.put("PF_TABLE", PF_TABLE);

		// 프로젝트 테이블 
		// 조인 조건 : 게시글 번호(BOARD_ID)
		// 응모 테이블(TB_APPLY) & 게시글 테이블(TB_BOARD)
		List<TB_BOARD> project = mapper.mypageProject(cust_id);
		
		JSONArray PROJECT = new JSONArray();
		
		for (TB_BOARD pjItem : project) {
			
			JSONObject pjobj = new JSONObject();
			pjobj.put("BOARD_ID", pjItem.getBoard_id());
			pjobj.put("PRO_TITLE", pjItem.getPro_title());
			pjobj.put("PRO_LINK", pjItem.getPro_link());
			
			// 프로젝트 이미지 
			if (pjItem.getPro_img() != null) {
				// 이미지 변환
				ImageConverter<File, String> converter = new ImageToBase64();
				File file = new File("c:\\cocoImage\\" + pjItem.getPro_img());

				String fileStringValue = null;
				try {
					fileStringValue = converter.convert(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
				pjobj.put("PRO_IMG", fileStringValue);
			} else {
				pjobj.put("PRO_IMG", null);
			}
			
			PROJECT.add(pjobj);
			
		}
		
		obj.put("PROJECT", PROJECT);
		System.out.println(PROJECT);

		List<String> skillArray = new ArrayList<>();
		// 회원 스킬
		List<TB_CUST_SKILL> custSkill = mapper.custSkill(cust_id);
		for (TB_CUST_SKILL csItem : custSkill) {
			skillArray.add(csItem.getSkill_name());
		}
		obj.put("SKILL_NAME", skillArray);
		
		return obj;
	}

	// 마이페이지(수정하기)
	public int userInfoUpdate(TB_CUST cust) {
		return mapper.userInfoUpdate(cust);
	}

	// 포트폴리오 추가하기
	public int pfAdd(TB_PF pf) {

		TB_PF addpf = new TB_PF(null, pf.getCust_id(), pf.getPf_title(), pf.getPf_path());
		return mapper.pfAdd(addpf);
	}

	// 포트폴리오 title 수정
	public int pfTitle(Map<String, Object> map) {

		// 포트폴리오번호, 회원아이디, 포트폴리오제목
		Integer pf_id = (Integer) map.get("pf_id");
		String cust_id = (String) map.get("cust_id");
		String pf_title = (String) map.get("pf_title");

		TB_PF pf = new TB_PF(pf_id, cust_id, pf_title);
		return mapper.pfTitle(pf);

	}

	// 포트폴리오 삭제하기
	public int pfDelete(Map<String, Object> map) {

		// 포트폴리오번호
		Integer pf_id = (Integer) map.get("pf_id");
		return mapper.pfDelete(pf_id);
	}
	
	// 회원탈퇴 
	public int deleteCust(Map<String, String> map) {
		return mapper.deleteCust(map.get("cust_id")); 
	}
}