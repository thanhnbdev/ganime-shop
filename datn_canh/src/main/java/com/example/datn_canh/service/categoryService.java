package com.example.datn_canh.service;

import com.example.datn_canh.entity.Category;
import com.example.datn_canh.reponsitory.CategoryRepository;
import com.example.datn_canh.serviceImp.categoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class categoryService implements categoryServiceImp {
    @Autowired
    CategoryRepository categoryRepositoryl;

    @Override
    public <S extends Category> List<S> saveAll(Iterable<S> entities) {
        return categoryRepositoryl.saveAll(entities);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepositoryl.findAll();
    }

    @Override
    public List<Category> findAllById(Iterable<Integer> integers) {
        return categoryRepositoryl.findAllById(integers);
    }

    @Override
    public <S extends Category> S save(S entity) {
        return categoryRepositoryl.save(entity);
    }

    @Override
    public Optional<Category> findById(Integer integer) {
        return categoryRepositoryl.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return categoryRepositoryl.existsById(integer);
    }

    @Override
    public long count() {
        return categoryRepositoryl.count();
    }

    @Override
    public void deleteById(Integer integer) {
        categoryRepositoryl.deleteById(integer);
    }

    @Override
    public void delete(Category entity) {
        categoryRepositoryl.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {
        categoryRepositoryl.deleteAllById(integers);
    }

    @Override
    public void deleteAll(Iterable<? extends Category> entities) {
        categoryRepositoryl.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        categoryRepositoryl.deleteAll();
    }
}
