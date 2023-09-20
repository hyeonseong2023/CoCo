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

	private int bmk_id;	// 북마크 순번 
	private String cust_id; // 회원 아이디	
	private int board_id; // 게시글 번호

}
