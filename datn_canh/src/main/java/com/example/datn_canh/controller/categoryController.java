package com.example.datn_canh.controller;

import com.example.datn_canh.entity.Category;
import com.example.datn_canh.serviceImp.categoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/ganime/category")
public class categoryController {
    @Autowired
    categoryServiceImp categoryServiceImp;
    @GetMapping("/listCategory")
    public String listCategory(Model model){
        List<Category> category=categoryServiceImp.findAll();
        model.addAttribute("category",category);
        return "category/listCategory";
    }
}
