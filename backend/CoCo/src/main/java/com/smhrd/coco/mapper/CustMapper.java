package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;

@Mapper
public interface CustMapper {
	
	// 마이페이지(기본정보)
	public List<TB_CUST> mypageCust(String cust_id); 
	
	// 마이페이지(포트폴리오)
	public List<TB_PF> mypagePf(String cust_id); 
	
	// 마이페이지(프로젝트)
    public List<TB_BOARD> mypageProject(String cust_id); 
	
    // 마이페이지(수정하기 페이지로 이동)
	public TB_CUST updatePage(String cust_id); 
	
	// 마이페이지(수정하기 버튼)
	public int userInfoUpdate(TB_CUST addCust); 
	
	// 포트폴리오 추가하기
	public int pfAdd(TB_PF pf); 
	
	// 포트폴리오 title 수정 
	public int pfTitle(TB_PF pf); 
	
	// 포트폴리오 삭제하기 
	public int pfDelete(Integer pf_id); 
	
}
