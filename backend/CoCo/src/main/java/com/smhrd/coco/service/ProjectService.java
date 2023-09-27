package com.smhrd.coco.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.mapper.ProjectMapper;

@Service
public class ProjectService {

	@Autowired
	private ProjectMapper mapper;

	// 프로젝트 응모 수락여부 Y인 멤버들 닉네임, 프로필사진 정보 보내기
	public List<TB_CUST> projectMemberList(int board_id) {
		List<TB_CUST> list = mapper.projectMemberList(board_id);
		return setCustImg(list);

	}

	// 프로젝트 응모 수락여부 N인 유저 아이디, 닉네임, 프로필사진
	public List<TB_CUST> projectApplyList(int board_id) {
		List<TB_CUST> list = mapper.projectApplyList(board_id);
		return setCustImg(list);
	}

	// 응모여부 N -> Y 로 바꾸기 (board_id, cust_id)
	public int projectAccept(int board_id, String cust_id) {
		return mapper.projectAccept(board_id, cust_id);
	}

	// 프로젝트 응모 거절로 응모테이블에서 삭제하기
	public int applyDecline(int board_id, String cust_id) {
		return mapper.applyDecline(board_id, cust_id);
	}

	// 프로젝트 명, 프로젝트 이미지 보내기. 이미지 없으면 null 값으로 (board_id)
	public TB_BOARD projectInfo(int board_id) {

		TB_BOARD projectInfo = mapper.projectInfo(board_id);
		if (projectInfo.getPro_img() != null) {

			ImageConverter<File, String> converter = new ImageToBase64();

			File file = new File("c:\\cocoImage\\" + projectInfo.getPro_img());
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			projectInfo.setPro_img(fileStringValue);

		}
		return projectInfo;
	}
	
	//프로젝트 명, 프로젝트 이미지 업데이트 (board_id)
	public int projectInfoUpdate(String pro_img, int board_id, String pro_title) {
		return mapper.projectInfoUpdate(pro_img, board_id, pro_title);
	}
	
	
	
	

	// ------------------------------------------------메서드------------------------------------------------------//

	// 프로필사진 프론트로 보낼때 바이트 형태로 변경 저장하기
	public List<TB_CUST> setCustImg(List<TB_CUST> list) {
		ImageConverter<File, String> converter = new ImageToBase64();

		for (TB_CUST applyList : list) {
			File file = new File("c:\\cocoImage\\" + applyList.getCust_img());
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			applyList.setCust_img(fileStringValue);
		}
		return list;
	}

}
