package com.example.spm.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 모든 origin 허용 (개발 환경)
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // 특정 origin만 허용하려면 아래 주석 해제
        // config.addAllowedOrigin("http://localhost:5173");
        // config.addAllowedOrigin("http://localhost:5174");

        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
