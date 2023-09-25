package com.smhrd.coco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.coco.domain.TB_CUST;

@Mapper
public interface ProjectMapper {
	
	public List<TB_CUST> projectMemberList(int board_id);

}
