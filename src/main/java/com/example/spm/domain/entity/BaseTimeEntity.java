package com.example.spm.domain.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass // 테이블로 매핑하지 않고, 자식 클래스(엔티티)에게 매핑 정보만 상속해줌
@EntityListeners(AuditingEntityListener.class) // 엔티티의 변화를 감지하는 리스너 등록
public abstract class BaseTimeEntity {

    @CreatedDate // 생성 시 날짜 자동 저장
    @Column(updatable = false) // 생성일은 수정되면 안 됨
    private LocalDateTime createdDate;

    @LastModifiedDate // 변경 시 날짜 자동 저장
    private LocalDateTime lastModifiedDate;
}
