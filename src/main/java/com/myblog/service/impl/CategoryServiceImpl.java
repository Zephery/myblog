package com.myblog.service.impl;

import com.myblog.dao.CategoryMapper;
import com.myblog.entity.Category;
import com.myblog.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Zephery on 2017/1/18.
 */
@Service("categoryService")
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> getAll() {
        return categoryMapper.getAll();
    }

    @Override
    public Category selectByPrimaryKey(Integer id) {
        return categoryMapper.selectByPrimaryKey(id);
    }

    @Override
    public String getCategoryname(Integer catalogid) {
        return categoryMapper.getCategoryname(catalogid);
    }

    @Override
    public int insert(Category category) {
        return categoryMapper.insert(category);
    }

    @Override
    public int update(Category category) {
        return categoryMapper.updateByPrimaryKey(category);
    }

    @Override
    public int delete(int catalogid) {
        return categoryMapper.deleteByPrimaryKey(catalogid);
    }
}
