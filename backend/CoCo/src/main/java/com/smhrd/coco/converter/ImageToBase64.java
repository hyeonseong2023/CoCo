package com.smhrd.coco.converter;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

// FileUtils 라이브러리 추가 
import org.apache.commons.io.FileUtils;

public class ImageToBase64 extends ImageConverter<File, String> {

	@Override
	public String convert(File f) throws IOException {
		
		//파일을 문자열로 변환 
		// 1.파일을 가지고오기 -> 바이트 배열형태로 읽기 
		byte[] fileContent = FileUtils.readFileToByteArray(f);
		// 2.바이트 형태를 인코딩 (base64) dfgsdfg--7896789
		String result = Base64.getEncoder().encodeToString(fileContent);
		return result;
	}

}