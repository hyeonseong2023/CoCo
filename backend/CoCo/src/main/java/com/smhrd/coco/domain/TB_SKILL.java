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
public class TB_SKILL {
	
	 
    private Long SKILL_ID; // 기술스택 번호
    private String SKILL_TYPE;    
    private String SKILL_NAME; // 기술스택 명

}
