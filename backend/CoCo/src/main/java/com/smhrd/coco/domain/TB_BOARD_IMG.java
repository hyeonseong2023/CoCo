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
public class TB_BOARD_IMG {
	
	
    private Long BOARD_IMG_ID; // 이미지 구분 번호    
    private Long BOARD_ID; // 게시글 번호    
    private String BOARD_IMG; // 게시글 이미지 경로


}
