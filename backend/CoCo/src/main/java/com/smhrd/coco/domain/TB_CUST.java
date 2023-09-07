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


	private String CUST_ID; 
	private String CUST_NICK; 
	private String CUST_CAREER; 
	private String CUST_IMG;
	private String CUST_GIT; 
	private String CUST_ROLE; 
	
	public void TB__CUST(String CUST_NICK , String CUST_CAREER,  String CUST_GIT , String CUST_ROLE) {
		this.CUST_NICK = CUST_NICK; 
		this.CUST_CAREER = CUST_CAREER; 
		this.CUST_GIT = CUST_GIT;
		this.CUST_ROLE = CUST_ROLE; 
	}

	
}
