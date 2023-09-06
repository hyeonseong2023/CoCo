package com.smhrd.coco.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor // 전부 초기화 시켜주는 생성자
@NoArgsConstructor // 기본생성자
@Getter // Get
@Setter // Set
@ToString
public class TB_PF {

	private Long PF_ID; // 포트폴리오 번호	
	private String CUST_ID; // 회원 아이디	
	private String PF_TITLE; // 포트폴리오 제목	
	private String PF_PATH; // 파일 경로

}
