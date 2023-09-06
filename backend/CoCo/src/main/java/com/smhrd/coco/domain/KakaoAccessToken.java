package com.smhrd.coco.domain;

import lombok.Data;

@Data
public class KakaoAccessToken {
    private String access_token; 
    private String token_type; 
    private String refresh_token;
    private int expires_in;
    private String scope; 
    private String refresh_token_expires_in ; 
   
}
