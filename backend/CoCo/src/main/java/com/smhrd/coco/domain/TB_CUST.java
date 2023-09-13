package com.smhrd.coco.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor//전부 초기화 시켜주는 생성자
@NoArgsConstructor//기본생성자 
@Getter //Get
@Setter //Set 
@ToString
public class TB_CUST {


	private String CUST_ID; //회원 아이디 
	private String CUST_NICK; // 회원 닉네임
	private String CUST_CAREER; // 회원 경력
	private String CUST_POSITION; // 회원 포지션 (한개 선택) 
	private String CUST_IMG; // 회원 프로필 사진 이미지 경로 
	private String CUST_GIT; // 회원 깃허브 링크 
	

	
}
