package com.smhrd.coco.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor//전부 초기화 시켜주는 생성자
@NoArgsConstructor//기본생성자 
@Getter //Get
@Setter //Set 
@ToString
public class Kakao {

	private String cust_id; 
	private String cust_nick;
	private String cust_position; 
	private String cust_career; 
	private String cust_skill; 
//	private String cust_img; 
//	private String cust_git;
 
	
//	public Kakao (String cust_id, String cust_nick ,  String cust_position, String cust_career ,String cust_skill) {
//		this.cust_id = cust_id;
//		this.cust_nick = cust_nick;
//		this.cust_position = cust_position; 
//		this.cust_career = cust_career; 
//		this.cust_skill = cust_skill ; 
//		
//	}
}

