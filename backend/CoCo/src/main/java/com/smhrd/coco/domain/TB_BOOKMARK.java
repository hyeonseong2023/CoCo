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
public class TB_BOOKMARK {

	private Long BMK_ID;	
	private String CUST_ID; // 회원 아이디	
	private Long BOARD_ID; // 게시글 번호

}
