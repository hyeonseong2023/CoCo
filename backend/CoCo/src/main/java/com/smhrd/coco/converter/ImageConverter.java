package com.smhrd.coco.converter;

import java.io.IOException;

//F : 실제파일 넣을거임
//s : 파일을 어떤 형태로 변환할지 지정 (byte 형태 문자열. String)
public abstract class ImageConverter<F, S> {
 //<> : generic , 사용자가 필요할때 형태를 지정할 수 있음
 
 //실제 변환할 때 오버라이딩 할 추상메서드 정의
 public abstract S convert(F f) throws IOException;
 
}
