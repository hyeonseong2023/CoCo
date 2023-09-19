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
	
	
    private Integer BOARD_IMG_ID; // 이미지 구분 번호    
    private Integer board_id; // 게시글 번호    
    private String BOARD_IMG; // 게시글 이미지 경로
    
    
	public TB_BOARD_IMG(Integer bOARD_ID, String bOARD_IMG) {
		super();
		board_id = bOARD_ID;
		BOARD_IMG = bOARD_IMG;
	}
	
	public TB_BOARD_IMG(Integer bOARD_ID) {
		super();
		board_id = bOARD_ID;
	}
    
    


}
