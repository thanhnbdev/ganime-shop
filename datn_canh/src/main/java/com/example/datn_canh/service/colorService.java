package com.example.datn_canh.service;

import com.example.datn_canh.entity.Color;
import com.example.datn_canh.reponsitory.ColorRepository;
import com.example.datn_canh.serviceImp.colorServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class colorService implements colorServiceImp {
    @Autowired
    ColorRepository colorRepository;

    @Override
    public <S extends Color> List<S> saveAll(Iterable<S> entities) {
        return colorRepository.saveAll(entities);
    }

    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public List<Color> findAllById(Iterable<Integer> integers) {
        return colorRepository.findAllById(integers);
    }

    @Override
    public <S extends Color> S save(S entity) {
        return colorRepository.save(entity);
    }

    @Override
    public Optional<Color> findById(Integer integer) {
        return colorRepository.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return colorRepository.existsById(integer);
    }

    @Override
    public long count() {
        return colorRepository.count();
    }

    @Override
    public void deleteById(Integer integer) {
        colorRepository.deleteById(integer);
    }

    @Override
    public void delete(Color entity) {
        colorRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {
        colorRepository.deleteAllById(integers);
    }

    @Override
    public void deleteAll(Iterable<? extends Color> entities) {
        colorRepository.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        colorRepository.deleteAll();
    }
}
