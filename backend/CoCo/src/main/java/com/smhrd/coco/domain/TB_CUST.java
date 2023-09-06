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

	
}
