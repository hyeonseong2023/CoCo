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
public class TB_BOARD_SKILL {

	private Integer BOARD_SKILL_SEQ; //게시판 스킬 구분 번호
    private Integer board_id; // 게시글 번호    
    private String SKILL_NAME ; // 스킬 이름 
    
    
	public TB_BOARD_SKILL(Integer bOARD_ID, String sKILL_NAME) {
		super();
		board_id = bOARD_ID;
		SKILL_NAME = sKILL_NAME;
	}
    
    
}
