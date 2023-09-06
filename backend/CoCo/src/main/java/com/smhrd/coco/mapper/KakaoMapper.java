package com.smhrd.coco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_CUST;


@Mapper
public interface KakaoMapper {

	// 카카오 이메일 조회
	public int selectEmail(String CUST_ID);
	
	// 이미지경로 가져오기
	public String img(String CUST_ID);

	// 첫 로그인 기본 정보 DB에 저장
	public int firstLogin(TB_CUST cust); 


}
