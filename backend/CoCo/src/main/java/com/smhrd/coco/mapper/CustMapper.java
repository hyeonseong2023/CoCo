package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;

@Mapper
public interface CustMapper {
	
	// 마이페이지(기본정보)
	public List<TB_CUST> mypageCust(String CUST_ID); 
	
	// 마이페이지(포트폴리오)
	public List<TB_PF> mypagePf(String CUST_ID); 
	
	// 마이페이지(프로젝트)
    public List<TB_BOARD> mypageProject(String CUST_ID); 
	
	// 마이페이지(연필 버튼)
	public TB_CUST updatePage(String CUST_ID); 
	
	// 마이페이지(수정하기 버튼)
	public int update(TB_CUST cust); 
	
}
