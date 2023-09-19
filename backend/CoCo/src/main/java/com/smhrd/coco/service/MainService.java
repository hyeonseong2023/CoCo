package com.smhrd.coco.service;	

import java.util.List;	
import java.util.Map;	

import org.json.simple.JSONArray;	
import org.json.simple.JSONObject;	
import org.springframework.beans.factory.annotation.Autowired;	
import org.springframework.stereotype.Service;	

import com.smhrd.coco.domain.TB_BOARD;	
import com.smhrd.coco.domain.TB_BOOKMARK;	
import com.smhrd.coco.mapper.MainMapper;	

@Service	
public class MainService {	

	@Autowired	
	MainMapper mapper;	

	// 조회수 증가	
	public int increaseViews(int board_id) {	
		return mapper.increaseViews(board_id);	
	}	

	// 인기글(조회수기반) 가져오기	
	public JSONArray popularList() {	

		List<TB_BOARD> list = mapper.popularList();	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD popularList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("popularList", popularList);	
			jsonArray.add(obj);	
		}	
		return jsonArray;	
	}	

	// 북마크 저장	
	public int bookmarkCheck(TB_BOOKMARK book) {	
		return mapper.bookmarkCheck(book.getCUST_ID(), book.get);	
	}	

	// 북마크된 게시글만 불러오기	
	public JSONArray bookmarkList(String cust_id) {	

		List<TB_BOOKMARK> list = mapper.bookmarkList(cust_id);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOOKMARK bookList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("bookList", bookList);	
			jsonArray.add(obj);	
		}	
		return jsonArray;	
	}	

	// 최신순 게시글 6개씩 가져오기	
	public JSONArray recentList(int endpoint) {	

		List<TB_BOARD> list = mapper.recentList(endpoint);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD recentList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("recentList", recentList);	
			jsonArray.add(obj);	
		}	
		return jsonArray;	
	}	

	// 스킬에 맞는 최신순 게시글 가져오기	
	public JSONArray skillList(String skillname, int endpoint) {	

		List<TB_BOARD> list = mapper.skillList(skillname, endpoint);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD skillList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("skillList", skillList);	
			jsonArray.add(obj);	
		}	
		return jsonArray;	
	}	

	// 포지션에 맞는 최신순 게시글 가져오기	
	public JSONArray positionList(String board_position, int endpoint) {	

		List<TB_BOARD> list = mapper.positionList(board_position, endpoint);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD positionList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("positionList", positionList);	
			jsonArray.add(obj);	

		}	
		return jsonArray;	

	}	

	// 지원한 게시글 보기	
	public JSONArray applyList(String cust_id) {	

		List<TB_BOARD> list = mapper.applyList(cust_id);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD applyList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("applyList", applyList);	
			jsonArray.add(obj);	

		}	
		return jsonArray;	

	}	

	// 내가 작성한 글 보기	
	public JSONArray writeList(String cust_id) {	

		List<TB_BOARD> list = mapper.writeList(cust_id);	

		JSONArray jsonArray = new JSONArray();	
		for (TB_BOARD writeList : list) {	
			JSONObject obj = new JSONObject();	
			obj.put("writeList", writeList);	
			jsonArray.add(obj);	

		}	
		return jsonArray;	

	}

}