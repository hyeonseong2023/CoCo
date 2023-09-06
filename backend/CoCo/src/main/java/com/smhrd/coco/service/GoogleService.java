package com.smhrd.coco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.coco.mapper.GoogleMapper;

@Service
public class GoogleService {

	@Autowired
	private GoogleMapper mapper;

	// 구글 이메일 조회
	public int selectEmail(String cust_id) {
		return mapper.selectEmail(cust_id);
	}

	// 이미지경로 가져오기
	public String img(String cust_id) {
		return mapper.img(cust_id);
	}
}
