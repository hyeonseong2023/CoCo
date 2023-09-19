package com.smhrd.coco.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor // 전부 초기화 시켜주는 생성자
@NoArgsConstructor // 기본생성자
@Getter //Get
@Setter // Set
@ToString
public class TB_PF {

	private Integer pf_id; // 포트폴리오 번호	
	private String cust_id; // 회원 아이디	
	private String pf_title; // 포트폴리오 제목	
	private String pf_path; // 파일 경로
	
	
	public TB_PF(Integer pf_id, String cust_id, String pf_title) {
		super();
		this.pf_id = pf_id;
		this.cust_id = cust_id;
		this.pf_title = pf_title;
	}

	
}
