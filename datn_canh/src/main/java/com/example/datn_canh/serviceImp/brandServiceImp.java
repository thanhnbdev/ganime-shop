package com.example.datn_canh.serviceImp;

import com.example.datn_canh.entity.Brand;

import java.util.List;
import java.util.Optional;

public interface brandServiceImp {
    <S extends Brand> List<S> saveAll(Iterable<S> entities);

    List<Brand> findAll();

    List<Brand> findAllById(Iterable<Integer> integers);

    <S extends Brand> S save(S entity);

    Optional<Brand> findById(Integer integer);

    boolean existsById(Integer integer);

    long count();

    void deleteById(Integer integer);

    void delete(Brand entity);

    void deleteAllById(Iterable<? extends Integer> integers);

    void deleteAll(Iterable<? extends Brand> entities);

    void deleteAll();
}
