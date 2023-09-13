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


	private Integer BOARD_ID; // 게시글 번호
	private String CUST_ID; // 회원 아이디
	private String BOARD_TITLE; // 게시글 제목
	private String BOARD_MEMBERS; // 모집인원
	private String BOARD_PERIOD; // 진행기간
	private String BOARD_DEADLINE; // 시작일 = 모집 마감일 (YYYYMMDD)
	private String BOARD_OPENTALK; // 오픈톡 링크
	private String BOARD_CONTENT; // 게시글 내용
	private String BOARD_DT; // 게시글 등록 일시
	private Integer BOARD_VIEWS; // 조회수
	private String BOARD_POSITION; // 포지션 (다수선택) 
	private String PRO_TITLE; // 프로젝트 제목
	private String PRO_IMG; // 프로젝트 이미지 경로
	private String PRO_LINK; // 화상회의 링크
	
	
	
	public TB_BOARD(String cUST_ID, String bOARD_TITLE, String bOARD_MEMBERS, String bOARD_PERIOD,
			String bOARD_DEADLINE, String bOARD_OPENTALK, String bOARD_CONTENT, Integer bOARD_VIEWS,
			String bOARD_POSITION, String pRO_TITLE, String pRO_IMG, String pRO_LINK) {
		super();
		CUST_ID = cUST_ID;
		BOARD_TITLE = bOARD_TITLE;
		BOARD_MEMBERS = bOARD_MEMBERS;
		BOARD_PERIOD = bOARD_PERIOD;
		BOARD_DEADLINE = bOARD_DEADLINE;
		BOARD_OPENTALK = bOARD_OPENTALK;
		BOARD_CONTENT = bOARD_CONTENT;
		BOARD_VIEWS = bOARD_VIEWS;
		BOARD_POSITION = bOARD_POSITION;
		PRO_TITLE = pRO_TITLE;
		PRO_IMG = pRO_IMG;
		PRO_LINK = pRO_LINK;
	}
	
	

	
    
    

  
}
