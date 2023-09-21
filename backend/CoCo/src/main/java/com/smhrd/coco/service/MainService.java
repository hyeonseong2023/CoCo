package com.smhrd.coco.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.mapper.MainMapper;

@Service
public class MainService {
	@Autowired
	private MainMapper mapper;

	// 조회수 증가
	public int increaseViews(int board_id) {
		return mapper.increaseViews(board_id);
	}

	// 인기글(조회수기반) 가져오기
	public JSONArray popularList() {
		List<TB_BOARD> list = mapper.popularList();
		return boardList(list);
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
		List<TB_BOARD> list = mapper.bookmarkList(cust_id);
		return boardList(list);

	}

	
	// 게시글 불러오기 
	// 기술스택명 = null   포지션 = null  엔드포인트 : 1    최신순 게시글 가져오기 
	// 기술스택명 = React  포지션 = null  엔드포인트 : 1    기술스택명에 맞는 최신순 게시글 가져오기
	// 기술스택명 = null,  포지션 = 백엔드  엔드포인트 : 1    포지션에 맞는 최신순 게시글 가져오기
	// 기술스택명 = React  포지션 = 백엔드  엔드포인트 : 1    기술스택과 포지션에 맞는 최신순 게시글 가져오기 
	public JSONArray selectList(Map<String, Object> map) {
		System.out.println(map);

		String skill_name = (String)map.get("skill_name");  // 기술스택명
		String board_position = (String) map.get("board_position"); //포지션
		int endpoint = (int)map.get("endpoint"); //엔드포인트 
				
		//최신순 게시글 가져오기 
		if(skill_name == null && board_position == null) {
			return recentList(endpoint); 
			// 기술스택명에 맞는 최신순 게시글 가져오기 
		} else if (skill_name == null && board_position != null) {
			return skillList(skill_name, endpoint); 
			// 포지션에 맞는 최신순 게시글 가져오기  
		} else if (skill_name != null && board_position == null ) {
			return positionList(board_position, endpoint);
		} else { //기술스택과 포지션에 맞는 최신순 게시글 가져오기 
			return skillPositionList(skill_name,board_position,endpoint);
		}
		
	}
	
	// 최신순 게시글 가져오기
	public JSONArray recentList(int endpoint) {
		List<TB_BOARD> list = mapper.recentList(endpoint);
		return boardList(list);
	}

	// 스킬에 맞는 최신순 게시글 가져오기
	public JSONArray skillList(String skill_name, int endpoint) {
		List<TB_BOARD> list = mapper.skillList(skill_name, endpoint);
		return boardList(list);
	}

	// 포지션에 맞는 최신순 게시글 가져오기
	public JSONArray positionList(String board_position, int endpoint) {
		List<TB_BOARD> list = mapper.positionList(board_position, endpoint);
		return boardList(list);
	}
	
	//기술스택과 포지션에 맞는 최신순 게시글 가져오기 
	public JSONArray skillPositionList(String skill_name, String board_position, int endpoint ) {
		List<TB_BOARD> list = mapper.skillPositionList(skill_name, board_position, endpoint);
		return boardList(list); 
	}

	
	// 지원한 게시글 보기
	public JSONArray applyList(String cust_id) {

		List<TB_BOARD> list = mapper.applyList(cust_id);
		return boardList(list);
	}

	// 내가 작성한 글 보기
	public JSONArray writeList(String cust_id) {

		List<TB_BOARD> list = mapper.writeList(cust_id);
		return boardList(list);
	}

	// 각 게시글의 스킬리스트 + 게시글 정보를 보여주는 메서드
	public JSONArray boardList(List<TB_BOARD> list) {

		JSONArray jsonArray = new JSONArray();

		for (TB_BOARD pb : list) {

			HashMap<String, Object> map = new HashMap<String, Object>();

			map.put("board_id", pb.getBoard_id());
			map.put("cust_id", pb.getCust_id());
			map.put("board_title", pb.getBoard_title());
			map.put("board_period", pb.getBoard_period());
			map.put("board_deadline", pb.getBoard_deadline());
			map.put("board_openlink", pb.getBoard_openlink());
			map.put("board_content", pb.getBoard_content());
			map.put("board_dt", pb.getBoard_dt());
			map.put("board_views", pb.getBoard_views());
			map.put("board_position", pb.getBoard_position());
			map.put("pro_title", pb.getPro_title());
			map.put("pro_img", pb.getPro_img());
			map.put("pro_link", pb.getPro_link());

			// 해당게시글의 스킬리스트 가져오기
			List<TB_BOARD_SKILL> skillList = mapper.boardIdList(pb.getBoard_id());
			List<String> skillNames = new ArrayList<>();

			for (TB_BOARD_SKILL sk : skillList) {
				skillNames.add(sk.getSKILL_NAME());
			}

			map.put("skill_names", skillNames);
			jsonArray.add(new JSONObject(map));
		}

		return jsonArray;
	}

}