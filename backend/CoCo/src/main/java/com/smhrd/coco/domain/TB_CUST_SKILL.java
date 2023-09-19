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
public class TB_CUST_SKILL {

	private Integer skill_seq;	
	private String cust_id; // 회원 아이디	
	private String skill_name; // 스킬 이름 
	
	
	public TB_CUST_SKILL(String cust_id, String skill_name) {
		super();
		this.cust_id = cust_id;
		this.skill_name = skill_name;
	}

}
