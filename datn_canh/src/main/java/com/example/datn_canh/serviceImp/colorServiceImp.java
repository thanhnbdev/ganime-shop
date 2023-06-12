package com.example.datn_canh.serviceImp;

import com.example.datn_canh.entity.Color;

import java.util.List;
import java.util.Optional;

public interface colorServiceImp {
    <S extends Color> List<S> saveAll(Iterable<S> entities);

    List<Color> findAll();

    List<Color> findAllById(Iterable<Integer> integers);

    <S extends Color> S save(S entity);

    Optional<Color> findById(Integer integer);

    boolean existsById(Integer integer);

    long count();

    void deleteById(Integer integer);

    void delete(Color entity);

    void deleteAllById(Iterable<? extends Integer> integers);

    void deleteAll(Iterable<? extends Color> entities);

    void deleteAll();
}
