package com.smhrd.coco.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GoogleMapper {

	// 구글 이메일 조회
	public int selectEmail(String cust_id);

	// 이미지경로 가져오기
	public String img(String cust_id);
}
