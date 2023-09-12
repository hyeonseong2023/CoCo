package com.smhrd.coco.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.mapper.MainMapper;
import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;

@Service
public class MainService {

	@Autowired
	private MainMapper mapper;

	@Autowired //특정 경로에 있는 파일을 가지고 오기 
	private ResourceLoader resourceLoader;

	// 조회수 증가
	public int increaseViews(int board_id) {
		return mapper.increaseViews(board_id);
	}

	// 인기글(조회수기반) 가져오기
	public JSONArray popularList() {

		List<TB_BOARD> list = mapper.popularList();

		JSONArray jsonArray = new JSONArray();
		
		int[] board_ids = new int[list.size()];
		int index = 0; 
		
		for (TB_BOARD popularList : list) {
			// 인기글 정보 가져오기
			JSONObject obj = new JSONObject();
			obj.put("popularList", popularList);
			jsonArray.add(obj);
			
			board_ids[index] = popularList.getBoard_id();
			index ++; 
		}

		
		for (int i = 0; i < board_ids.length; i++) {

		    List<TB_BOARD_SKILL> skillList = mapper.boardIdList(board_ids[i]);

		    if (!skillList.isEmpty()) { // skillList가 비어있지 않다면 실행
		        ImageConverter<File, String> converter = new ImageToBase64();
		        String filePath = "classpath:/static/img/" + skillList.get(i).getSKILL_NAME() + ".svg"; // 첫 번째 요소 사용
		        Resource resource = resourceLoader.getResource(filePath);

		        String fileStringValue = null;
		        try {
		            fileStringValue = converter.convert(resource.getFile());
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		       

		    }
		    
	        JSONObject img = new JSONObject();
	        jsonArray.add(img);
		}
		
		return jsonArray;
	}

	// 북마크 저장
	public int bookmarkCheck(TB_BOOKMARK book) {
		return mapper.bookmarkCheck(book.getCust_id(), book.getBoard_id());
	}

	// 북마크 해제
	public int unBookmark(TB_BOOKMARK book) {
		return mapper.unBookmark(book.getCust_id(), book.getBoard_id());
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
	public JSONArray skillList(Map<String, Object> map) {

		String skill_name = (String) map.get("skill_name");
		int endpoint = (int) map.get("endpoint");

		List<TB_BOARD> list = mapper.skillList(skill_name, endpoint);

		JSONArray jsonArray = new JSONArray();
		for (TB_BOARD skillList : list) {
			JSONObject obj = new JSONObject();
			obj.put("skillList", skillList);
			jsonArray.add(obj);
		}
		return jsonArray;
	}

	// 포지션에 맞는 최신순 게시글 가져오기
	public JSONArray positionList(Map<String, Object> map) {

		String board_position = (String) map.get("board_position");
		int endpoint = (int) map.get("endpoint");

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
