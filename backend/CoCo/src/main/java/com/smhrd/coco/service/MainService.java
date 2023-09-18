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
		return mapper.bookmarkCheck(book.getCUST_ID(), book.getBOARD_ID());
	}

	// 북마크 해제
	public int unBookmark(TB_BOOKMARK book) {
		return mapper.unBookmark(book.getCUST_ID(), book.getBOARD_ID());
	}

	// 북마크된 게시글만 불러오기
	public JSONArray bookmarkList(String cust_id) {
		List<TB_BOARD> list = mapper.bookmarkList(cust_id);
		return boardList(list);

	}

	// 최신순 게시글 6개씩 가져오기
	public JSONArray recentList(int endpoint) {
		List<TB_BOARD> list = mapper.recentList(endpoint);
		return boardList(list);
	}

	// 스킬에 맞는 최신순 게시글 가져오기
	public JSONArray skillList(Map<String, Object> map) {
		String skill_name = (String) map.get("skill_name");
		int endpoint = (int) map.get("endpoint");

		List<TB_BOARD> list = mapper.skillList(skill_name, endpoint);
		return boardList(list);
	}

	// 포지션에 맞는 최신순 게시글 가져오기
	public JSONArray positionList(Map<String, Object> map) {
		String board_position = (String) map.get("board_position");
		int endpoint = (int) map.get("endpoint");

		List<TB_BOARD> list = mapper.positionList(board_position, endpoint);
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

			map.put("board_id", pb.getBOARD_ID());
			map.put("cust_id", pb.getCUST_ID());
			map.put("board_title", pb.getBOARD_TITLE());
			map.put("board_period", pb.getBOARD_PERIOD());
			map.put("board_deadline", pb.getBOARD_DEADLINE());
			map.put("board_openlink", pb.getBOARD_OPENTALK());
			map.put("board_content", pb.getBOARD_CONTENT());
			map.put("board_dt", pb.getBOARD_DT());
			map.put("board_views", pb.getBOARD_VIEWS());
			map.put("board_position", pb.getBOARD_POSITION());
			map.put("pro_title", pb.getPRO_TITLE());
			map.put("pro_img", pb.getPRO_IMG());
			map.put("pro_link", pb.getPRO_LINK());

			// 해당게시글의 스킬리스트 가져오기
			List<TB_BOARD_SKILL> skillList = mapper.boardIdList(pb.getBOARD_ID());
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