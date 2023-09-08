package com.smhrd.coco.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.coco.mapper.CustMapper;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;

@Service
public class CustService {

	@Autowired
	private CustMapper mapper;

	// 마이페이지(기본정보)
	public List<TB_CUST> mypageCust(String CUST_ID) {
		return mapper.mypageCust(CUST_ID);
	}

	// 마이페이지(포트폴리오)
	public List<TB_PF> mypagePf(String CUST_ID) {
		return mapper.mypagePf(CUST_ID);
	}

	// 마이페이지(프로젝트)
	public List<TB_BOARD> mypageProject(String CUST_ID) {
		return mapper.mypageProject(CUST_ID);
	}

	// 마이페이지(연필 버튼)
	public TB_CUST updatePage(String CUST_ID) {
		return mapper.updatePage(CUST_ID);
	}

	// 마이페이지(수정하기 버튼)
	public int update(TB_CUST cust) {
		return mapper.update(cust);
	}

}
