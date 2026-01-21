package com.example.spm.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Gson 설정 - JSON 직렬화/역직렬화
 */
@Configuration
public class GsonConfig {

    @Bean
    public Gson gson() {
        return new GsonBuilder()
                .setPrettyPrinting() // 가독성을 위한 포맷팅
                .serializeNulls() // null 값도 직렬화
                .create();
    }
}
