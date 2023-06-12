package com.example.datn_canh.serviceImp;

import com.example.datn_canh.entity.Category;

import java.util.List;
import java.util.Optional;

public interface categoryServiceImp {
    <S extends Category> List<S> saveAll(Iterable<S> entities);

    List<Category> findAll();

    List<Category> findAllById(Iterable<Integer> integers);

    <S extends Category> S save(S entity);

    Optional<Category> findById(Integer integer);

    boolean existsById(Integer integer);

    long count();

    void deleteById(Integer integer);

    void delete(Category entity);

    void deleteAllById(Iterable<? extends Integer> integers);

    void deleteAll(Iterable<? extends Category> entities);

    void deleteAll();
}
