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
public class SkillImgList {
   
   private Integer board_id; 
   private String skillImg;
   
   public SkillImgList(String skillImg) {
      super();
      this.skillImg = skillImg;
   }

}