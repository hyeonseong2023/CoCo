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
public class TB_NOTICE {

	
    private Integer NOTICE_ID;  // 알림 번호   
    private String CUST_ID; // 알림을 받는 회원아이디   
    private String NOTICE_CONTENT; // 알림 내용   
    private String NOTICE_DT; // 알림 전송 일시
    private Integer BOARD_ID; // 게시글 번호 
}
