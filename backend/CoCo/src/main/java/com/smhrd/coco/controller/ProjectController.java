package com.smhrd.coco.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.coco.service.BoardService;
import com.smhrd.coco.service.ProjectService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProjectController {
	
	@Autowired
	private ProjectService service;
	
	@PostMapping("/projectmemberlist")
	public JSONArray projectMemberList(@RequestBody JSONObject obj) {
		
		JSONArray array = service.projectMemberList((Integer)obj.get("board_id"));
		return array;
	}

}
