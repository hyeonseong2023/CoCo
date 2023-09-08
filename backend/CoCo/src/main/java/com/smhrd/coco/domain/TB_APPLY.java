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
public class TB_APPLY {

	private Integer APPLY_ID; // 응모 순번 
	private Integer BOARD_ID; // 게시글 번호	
	private String CUST_ID; // 회원 아이디
	private String APPROVE_YN; // 수락여부 (Default : N) 

}
