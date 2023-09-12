
package com.smhrd.coco.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.smhrd.coco.domain.SkillImgList;
import com.smhrd.coco.domain.TB_APPLY;
import com.smhrd.coco.domain.TB_BOARD;
import com.smhrd.coco.domain.TB_BOARD_IMG;

import com.smhrd.coco.domain.TB_BOARD_SKILL;
import com.smhrd.coco.domain.TB_BOOKMARK;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.mapper.BoardMapper;
import com.smhrd.coco.converter.ImageConverter;
import com.smhrd.coco.converter.ImageToBase64;

@Service
public class BoardService {

	
	@Autowired
	ResourceLoader resourceLoader;
	//특정 경로에 있는 파일을 가지고 오기
	
   @Autowired
   private BoardMapper mapper;

   // TB_BOARD 정보 저장
   public int postSaveBoard(TB_BOARD board) {
      return mapper.postSaveBoard(board);
   }

   // TB_BOARD_SKILL 정보 저장
   public int postSaveSkill(TB_BOARD_SKILL skill) {
      return mapper.postSaveSkill(skill);
   }

   // TB_BOARD_IMG 정보저장
   public int postSaveImg(TB_BOARD_IMG img) {
      return mapper.postSaveImg(img);
   }

   
   //선택한 게시글 내용 보내기 (TB_BOARD, TB_BOARD_SKILL, TB_BOARD_IMG, TB_BOOKMARK, TB_APPLY)
   public JSONArray selectPostViews(int board_id, String cust_id) {

      TB_BOARD board = mapper.selectPostBoard(board_id);
      String createId = board.getCust_id();
      TB_CUST cust = mapper.selectPostCust(cust_id);
      List<TB_BOARD_SKILL> skill = mapper.selectPostSkill(board_id);
      TB_BOARD_IMG img = mapper.selectPostImag(board_id);
      int bmk = mapper.selectPostBmk(board_id, cust_id);
      int apply = mapper.selectPostApply(board_id, cust_id);
      
      System.out.println("리스트 길이 : " + skill.size());
      
      
      ImageConverter<File, String> converter = new ImageToBase64();
      
      //스킬 이미지 저장한 리스트 생성
      List<SkillImgList> skillImg =  new ArrayList<>();
      
      //스킬에 따른 스킬뱃지이미지 찾아 바이트 형태로 변환하기
      for(int i=0; i<skill.size(); i++) {
			//1. img필드값 수정 (파일이름에서 -> byte 문자열 형태로)
			//1-1. 변환할 파일 실제 경로 정의
			//만약 filePath : static/img/dress1.jpeg 
			String filePath = "classpath:/static/img/"+skill.get(i).getSKILL_NAME()+".svg";
			Resource resource = resourceLoader.getResource(filePath); //파일의 메타데이터
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			 SkillImgList skillImage = new SkillImgList(); // 새로운 객체 생성
			 
			 skillImage.setSkillImg(fileStringValue);
			 skillImg.add(skillImage); // 리스트에 추가
			
	
			skillImg.get(i).setSkillImg(fileStringValue);
			
			//2.객체를 jsonObject(key:value) 형태로 변경하기
			JSONObject obj = new JSONObject(); //비어있는 jsonobject 생성
			obj.put("skillImg", skillImg); //비어있는 json object 에 값 추가
		}
      
      
      // 선택한 게시물 작성자 프로필 사진 찾아서 바이트 형태로 변환
//      File custFile = new File("c:\\cocoImage\\" + cust.getCust_img());
//
//      String fileStringCust = null;
//      try {
//    	  fileStringCust = converter.convert(custFile);
//
//      } catch (IOException e) {
//         e.printStackTrace();
//      }
//      System.out.println(custFile);
//      cust.setCust_img(fileStringCust);

   
      //게시판 사진 파일 찾아서 바이트형태로 변환하기 
      File file = new File("c:\\cocoImage\\" + img.getBOARD_IMG());

      String fileStringValue = null;
      try {
         fileStringValue = converter.convert(file);

      } catch (IOException e) {
         e.printStackTrace();
      }
      System.out.println(file);
      img.setBOARD_IMG(fileStringValue);

      
      //JSONArray 에 모두 담기
      JSONArray jsonArray = new JSONArray();
      
      JSONObject obj = new JSONObject();
      obj.put("TB_BOARD", board);
      obj.put("TB_BOARD_SKILL", skillImg);
      obj.put("TB_BOARD_IMG", img);
      obj.put("TB_BOOKMARK", bmk);
      obj.put("TB_APPLY", apply);
      jsonArray.add(obj);
      return jsonArray;
   }

}