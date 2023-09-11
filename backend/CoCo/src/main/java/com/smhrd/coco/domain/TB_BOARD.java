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


	private Integer board_id; // 게시글 번호
	private String cust_id; // 회원 아이디
	private String board_title; // 게시글 제목
	private String board_members; // 모집인원
	private String board_period; // 진행기간
	private String board_deadline; // 시작일 = 모집 마감일 (YYYYMMDD)
	private String board_openlink; // 오픈톡 링크
	private String board_content; // 게시글 내용
	private String board_dt; // 게시글 등록 일시
	private Integer board_views; // 조회수
	private String board_position; // 포지션 (다수선택) 
	private String pro_title; // 프로젝트 제목
	private String pro_img; // 프로젝트 이미지 경로
	private String pro_link; // 화상회의 링크


	public TB_BOARD(String CUST_ID, String BOARD_TITLE, String BOARD_MEMBERS, String BOARD_PERIOD,
			String BOARD_DEADLINE, String BOARD_OPENTALK, String BOARD_CONTENT, Integer BOARD_VIEWS,
			String BOARD_POSITION, String PRO_TITLE, String PRO_LINK, String PRO_IMG) {
		super();
		CUST_ID = CUST_ID;
		BOARD_TITLE = BOARD_TITLE;
		BOARD_MEMBERS = BOARD_MEMBERS ;
		BOARD_PERIOD = BOARD_PERIOD;
		BOARD_DEADLINE = BOARD_DEADLINE;
		BOARD_OPENTALK = BOARD_OPENTALK;
		BOARD_CONTENT = BOARD_CONTENT;
		BOARD_VIEWS = BOARD_VIEWS;
		BOARD_POSITION = BOARD_POSITION;
		PRO_TITLE = PRO_TITLE;
		PRO_LINK = PRO_LINK;
		PRO_IMG = PRO_IMG;
	}
    
    

  
}
