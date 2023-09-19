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

	public TB_BOARD(String cust_id, String board_title, String board_members, String board_period,
			String board_deadline, String board_openlink, String board_content, Integer board_views,
			String board_position, String pro_title, String pro_img, String pro_link) {
		super();
		this.cust_id = cust_id;
		this.board_title = board_title;
		this.board_members = board_members;
		this.board_period = board_period;
		this.board_deadline = board_deadline;
		this.board_openlink = board_openlink;
		this.board_content = board_content;
		this.board_views = board_views;
		this.board_position = board_position;
		this.pro_title = pro_title;
		this.pro_img = pro_img;
		this.pro_link = pro_link;
	}
	

}