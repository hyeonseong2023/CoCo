package com.smhrd.coco.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.coco.mapper.CustMapper;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.domain.TB_PF;

@Service
public class CustService {

	@Autowired
	private CustMapper mapper;
	
	// 회원 테이블(TB_CUST) 에서 아이디(CUST_ID)에 맞는  
	// 닉네임(CUST_NICK), 경력(CUST_CAREER), 깃허브링크(CUST_GIT), 직군 포지션(CUST_ROLE) 가져오고 
	public List<TB_CUST> mypageCust(String CUST_ID){
		return mapper.mypageCust(CUST_ID); 
	}
	
	// 포트폴리오 테이블(TB_PF)에서 아이디(CUST_ID)에 맞는
	// 포트폴리오 제목(PF_TITLE), 파일경로(PF_PATH) 가져오고
	public List<TB_PF> mypagePf(String CUST_ID){
		return mapper.mypagePf(CUST_ID); 
	}
	
	// 조인 조건 : 게시글 번호(BOARD_ID) 
	// 응모 테이블(TB_APPLY)에서 아이디(CUST_ID) 수락여부(APPROVE_YN)가 Y인 것 중에서 
	// 게시글 테이블(TB_BOARD)와 프로젝트제목(PRO_TITLE)과 사진경로(PRO_IMG) 가져오기
    public List<TB_BOARD> mypageApply(String CUST_ID){
    	return mapper.mypageApply(CUST_ID); 
    }
    
}
