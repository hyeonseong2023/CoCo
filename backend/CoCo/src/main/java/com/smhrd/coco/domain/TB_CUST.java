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


	private String cust_id; //회원 아이디 
	private String cust_nick; // 회원 닉네임
	private String cust_career; // 회원 경력
	private String cust_position; // 회원 포지션 (한개 선택) 
	private String cust_img; // 회원 프로필 사진 이미지 경로 
	private String cust_git; // 회원 깃허브 링크 
	private String cust_skill ;  // 회원 관심스킬 (다중선택) 9월21일 12시30분 다영
	private String cust_link ; // 회원 기타 링크 9월 25일 4시 18분 다영 
	
	

	public TB_CUST(String cust_id, String cust_nick, String cust_img) {
		super();
		this.cust_id = cust_id;
		this.cust_nick = cust_nick;
		this.cust_img = cust_img;
	}


    // 9월21일 12시30분 다영 
	public TB_CUST(String cust_id, String cust_nick, String cust_career, String cust_position, String cust_skill) {
		super();
		this.cust_id = cust_id;
		this.cust_nick = cust_nick;
		this.cust_career = cust_career;
		this.cust_position = cust_position;
		this.cust_skill = cust_skill;
	}
	


	
	
}
