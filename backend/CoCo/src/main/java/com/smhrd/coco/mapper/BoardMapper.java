package com.smhrd.coco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;
import com.smhrd.coco.domain.TB_REQUIRED_SKILL;

@Mapper
public interface BoardMapper {
	
	//TB_BOARD 정보 저장
	public int postSaveBoard(TB_BOARD board);
	
	//TB_REQUIRED_SKILL 정보 저장
	public int postSaveSkill(TB_REQUIRED_SKILL skill);
	
	//TB_BOARD_IMG 정보저장
	public int postSaveImg(TB_BOARD_IMG img);
	
	//TB_PROJECT 정보저장
	//public int postSaveProject(TB_PROJECT project);

}
