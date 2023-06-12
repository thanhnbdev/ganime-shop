package com.example.datn_canh.serviceImp;

import com.example.datn_canh.entity.Material;

import java.util.List;
import java.util.Optional;

public interface materialServiceImp {
    <S extends Material> List<S> saveAll(Iterable<S> entities);

    List<Material> findAll();

    List<Material> findAllById(Iterable<Integer> integers);

    <S extends Material> S save(S entity);

    Optional<Material> findById(Integer integer);

    boolean existsById(Integer integer);

    long count();

    void deleteById(Integer integer);

    void delete(Material entity);

    void deleteAllById(Iterable<? extends Integer> integers);

    void deleteAll(Iterable<? extends Material> entities);

    void deleteAll();
}
