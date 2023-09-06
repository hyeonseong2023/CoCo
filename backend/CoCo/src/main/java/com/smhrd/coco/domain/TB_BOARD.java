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
public class TB_BOARD {
	 
    private Long BOARD_ID; // 게시글 번호
    private String CUST_ID; // 회원 아이디 
    private Integer PRD_ID; // 프로젝트 번호
    private String BOARD_TITLE; // 게시글 제목    
    private String BOARD_MEMBERS; // 모집인원    
    private String BOARD_PERIOD; // 진행기간    
    private String BOARD_DEADLINE; // 시작일 = 모집 마감일 (YYYYMMDD)    
    private String BOARD_OPENTALK; // 오픈톡 링크    
    private String BOARD_CONTENT; // 게시글 내용    
    private String BOARD_DT; // 게시글 등록 일시    
    private Integer BOARD_VIEWS; // 조회수    
    private String PROJECT_ROLE; //프로젝트 역할 구분

}
