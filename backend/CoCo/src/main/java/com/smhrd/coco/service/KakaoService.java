package com.smhrd.coco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.coco.domain.KakaoAccessToken;
import com.smhrd.coco.domain.KakaoProfile;
import com.smhrd.coco.domain.TB_CUST;
import com.smhrd.coco.mapper.KakaoMapper;

// Controller에서 보내준 데이터와 요청을 가공 

@Service
public class KakaoService {

	@Autowired
	private KakaoMapper mapper;

	// 카카오 쪽으로 Access_Token 데이터 요청
	public String getAccessToken(String code) {

		RestTemplate rt = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

		String grantType = "authorization_code";
		String clientId = "23ddd7c45fb41d2db79ff49bd3a797c3";
		String local3000 = "http://localhost:3000";
		String redirectUri = local3000 + "/auth/kakao/callback";

		params.add("grant_type", grantType);
		params.add("client_id", clientId);
		params.add("redirect_uri", redirectUri);
		params.add("code", code);

		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

		// Http POST 방식으로 요청하기 -> response 변수에 응답데이터 받기
		ResponseEntity<String> response = rt.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST,
				kakaoTokenRequest, String.class);

		// System.out.println("Access_Token요청에 대한 모든값 : " + response.getBody());

		// ObjectMapper 이용하여 Access_Token요청에 대한 모든 값을 담기
		ObjectMapper objectMapper = new ObjectMapper();
		KakaoAccessToken Token = null;

		try {
			Token = objectMapper.readValue(response.getBody(), KakaoAccessToken.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return Token.getAccess_token();
	}

	// 토큰값 사용하여 사용자 정보 요청
	public String getUserProfile(String accessToken) {

		// 카카오 쪽으로 사용자 정보 데이터 요청
		RestTemplate rt = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

		// Http POST 방식으로 요청하기 -> response 변수에 응답데이터 받기
		ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
				kakaoProfileRequest, String.class);

		// System.out.println("사용자요청에 대한 모든값 : " + response.getBody());

		// ObjectMapper 이용하여 사용자 정보에 대한 모든 값을 담기
		ObjectMapper objectMapper = new ObjectMapper();
		KakaoProfile userProfile = null;

		try {
			userProfile = objectMapper.readValue(response.getBody(), KakaoProfile.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return userProfile.kakao_account.email;

	}

	// 카카오 이메일 가져오기
	public String kakaoEmail(String code) {
		// Access Token 가져오기
		String accesstoken = getAccessToken(code);
		// 사용자 정보 요청
		String cust_id = getUserProfile(accesstoken);

		return cust_id;
	}

	// 카카오 이메일 조회
	public int selectEmail(String CUST_ID) {
		return mapper.selectEmail(CUST_ID);
	}

	// 이미지경로 가져오기
	public String img(String CUST_ID) {
		return mapper.img(CUST_ID);
	}

	// 첫 로그인 기본 정보 DB에 저장
	public int firstLogin(TB_CUST cust) {
		return mapper.firstLogin(cust);
	}
}
