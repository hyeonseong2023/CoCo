package com.smhrd.coco.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_CUST_SKILL;
import com.smhrd.coco.domain.TB_PF;

@Mapper
public interface CustMapper {

	// 첫 로그인 기본 정보 DB 저장 
	public int firstLogin(TB_CUST cust); 
	
	// 이미지 체크 
	public int checkCustImg(String cust_id); 
	
	// 마이페이지(기본정보)
	public TB_CUST mypageCust(String cust_id); 
	
	// 마이페이지(포트폴리오)
	public List<TB_PF> mypagePf(String cust_id); 
	
	// 마이페이지(프로젝트)
    public List<TB_BOARD> mypageProject(String cust_id); 
	
	// 마이페이지(회원스킬) 
	public List<TB_CUST_SKILL> custSkill(String cust_id); 

	// 마이페이지(수정하기)
	public int userInfoUpdate(TB_CUST cust);

	// 포트폴리오 추가하기
	public int pfAdd(TB_PF pf);

	// 포트폴리오 title 수정
	public int pfTitle(TB_PF pf);

	// 포트폴리오 삭제하기
	public int pfDelete(Integer pf_id);

	// 회원탈퇴 
	public int deleteCust(String cust_id);
}
