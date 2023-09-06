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
public class TB_PROJECT {
	
	 
    private Long PRO_ID; // 프로젝트 번호    
    private String PRO_TITLE; // 프로젝트 제목   
    private String PRO_LINK; // 화상회의 링크
    private Long BOARD_ID;

}
