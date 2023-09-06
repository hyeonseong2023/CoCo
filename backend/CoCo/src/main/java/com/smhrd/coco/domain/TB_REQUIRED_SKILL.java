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
public class TB_REQUIRED_SKILL {

	private Long REQUIRED_SKILL_SEQ;  
    private Long BOARD_ID; // 게시글 번호    
    private Long SKILL_ID; // 기술스택 번호
}
