package com.smhrd.coco.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.mapper.ProjectMapper;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectMapper mapper;
	
	public JSONArray projectMemberList(int board_id) {
		
		List<TB_CUST> list = mapper.projectMemberList(board_id);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		for(TB_CUST projectMember : list) {
			File file = new File("c:\\cocoImage\\"+projectMember.getCust_img());
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			projectMember.setCust_img(fileStringValue);
			JSONObject obj = new JSONObject();
			obj.put("projectMember", projectMember);
			jsonArray.add(obj); 
			}
			
		return jsonArray;
	}
}
