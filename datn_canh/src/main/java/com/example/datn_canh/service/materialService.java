package com.example.datn_canh.service;

import com.example.datn_canh.entity.Material;
import com.example.datn_canh.reponsitory.MaterialRepository;
import com.example.datn_canh.serviceImp.materialServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class materialService implements materialServiceImp {
    @Autowired
    MaterialRepository materialRepository;

    @Override
    public <S extends Material> List<S> saveAll(Iterable<S> entities) {
        return materialRepository.saveAll(entities);
    }

    @Override
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    public List<Material> findAllById(Iterable<Integer> integers) {
        return materialRepository.findAllById(integers);
    }

    @Override
    public <S extends Material> S save(S entity) {
        return materialRepository.save(entity);
    }

    @Override
    public Optional<Material> findById(Integer integer) {
        return materialRepository.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return materialRepository.existsById(integer);
    }

    @Override
    public long count() {
        return materialRepository.count();
    }

    @Override
    public void deleteById(Integer integer) {
        materialRepository.deleteById(integer);
    }

    @Override
    public void delete(Material entity) {
        materialRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {
        materialRepository.deleteAllById(integers);
    }

    @Override
    public void deleteAll(Iterable<? extends Material> entities) {
        materialRepository.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        materialRepository.deleteAll();
    }
}
