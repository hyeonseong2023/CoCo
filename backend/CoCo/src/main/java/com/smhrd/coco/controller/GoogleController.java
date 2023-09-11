package com.smhrd.coco.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.coco.domain.GoogleLoginResponse;
import com.smhrd.coco.domain.GoogleOAuthRequest;
import com.smhrd.coco.domain.GoogleProfile;
import com.smhrd.coco.service.GoogleService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("http://localhost:3000")
public class GoogleController {

   @Autowired
   private GoogleService service;

   @Value("${google.auth.url}")
   private String googleAuthUrl;

   @Value("${google.login.url}")
   private String googleLoginUrl;

   @Value("${google.client.id}")
   private String googleClientId;

   @Value("${google.redirect.url}")
   private String googleRedirectUrl;

   @Value("${google.secret}")
   private String googleClientSecret;

   
   // 구글 로그인창 호출
   // http://localhost:8099/login/getGoogleAuthUrl
   @GetMapping("/login/getGoogleAuthUrl")
   public ResponseEntity<?> getGoogleAuthUrl(HttpServletRequest request) throws Exception {
      
      String reqUrl = googleLoginUrl + "/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri="
            + googleRedirectUrl + "&response_type=code&scope=email%20profile%20openid&access_type=offline";

      log.info("myLog-LoginUrl : {}", googleLoginUrl);
      log.info("myLog-ClientId : {}", googleClientId);
      log.info("myLog-RedirectUrl : {}", googleRedirectUrl);

      HttpHeaders headers = new HttpHeaders();
      headers.setLocation(URI.create(reqUrl));
      System.out.println(headers.toString());

      // 1.reqUrl 구글로그인 창을 띄우고, 로그인 후 /login/oauth2/code/google 으로 리다이렉션하게 한다.
      return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
   }

   
   // 구글에서 리다이렉션 후 로그인
   @GetMapping("/login/oauth2/code/google")
   public void oauth_google_check(HttpServletRequest request,
         @RequestParam(value = "code") String authCode, HttpServletResponse response) throws Exception {
      
      // 2.구글에 등록된 코코 설정정보를 보내어 약속된 토큰을 받위한 객체 생성
      GoogleOAuthRequest googleOAuthRequest = GoogleOAuthRequest.builder().clientId(googleClientId)
            .clientSecret(googleClientSecret).code(authCode).redirectUri(googleRedirectUrl)
            .grantType("authorization_code").build();

      RestTemplate restTemplate = new RestTemplate();

      // 3.토큰요청을 한다.
      ResponseEntity<GoogleLoginResponse> apiResponse = restTemplate.postForEntity(googleAuthUrl + "/token",
            googleOAuthRequest, GoogleLoginResponse.class);
      
      // 4.받은 토큰을 토큰객체에 저장
      GoogleLoginResponse googleLoginResponse = apiResponse.getBody();

      log.info("responseBody {}", googleLoginResponse.toString());

      String googleToken = googleLoginResponse.getId_token();

      // 5.받은 토큰을 구글에 보내 유저정보를 얻는다.
      String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo")
            .queryParam("id_token", googleToken).toUriString();

      // 6.허가된 토큰의 유저정보를 결과로 받는다.
      String resultJson = restTemplate.getForObject(requestUrl, String.class);

      ObjectMapper objectMapper = new ObjectMapper();
      GoogleProfile userProfile = null;

      userProfile = objectMapper.readValue(resultJson, GoogleProfile.class);
      System.out.println("email: " + userProfile.getEmail());
      String cust_id = userProfile.getEmail();

      // 구글 이메일 조회
      int selectEmail = service.selectEmail(cust_id);

      // 이미지경로 가져오기
      String CUST_IMG = service.img(cust_id);

      HttpSession session = request.getSession();

      if (selectEmail == 0) { // 회원가입 : 저장되지 않은 이메일 , 이미지 "0"
         System.out.println("DB에없는 이메일 ");
         
         //회원가입이 안된 회원이면 세션에 데이터 저장후 가입폼 작성창으로 리다이렉트
          session.setAttribute("CUST_ID", cust_id);
          session.setAttribute("CUST_IMG", "0");
         
         String redirect_uri="http://localhost:3000/Check";
         
         try {
            response.sendRedirect(redirect_uri);
         } catch (IOException e) {
            e.printStackTrace();
         }
         
      } else { // 로그인 : 이메일, 이미지
         
         //회원가입된 회원이면 세션에 데이터 저장
         System.out.println("DB에있는 이메일 ");
         session.setAttribute("CUST_ID", cust_id);
         session.setAttribute("CUST_IMG", CUST_IMG);
      }

      
   }
   
   //세션에 저장된 값 보내주기
   @GetMapping("/api/getUserData")
   public Map<String, Object> getUserData(HttpServletRequest request) {
       HttpSession session = request.getSession();
       String custId = (String) session.getAttribute("CUST_ID");
       String custImg = (String) session.getAttribute("CUST_IMG");

       Map<String, Object> data = new HashMap<>();
       data.put("CUST_ID", custId);
       data.put("CUST_IMG", custImg);

       return data;
   }
   	
   

}