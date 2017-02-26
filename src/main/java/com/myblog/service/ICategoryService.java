package com.myblog.service;

import com.myblog.entity.Category;

import java.util.List;

/**
 * Created by Zephery on 2016/6/12.
 */

public interface ICategoryService {
    public List<Category> getAll();
    public Category selectByPrimaryKey(Integer id);
    public String getCategoryname(Integer catalogid);
    public int insert(Category category);
    public int update(Category category);
    public int delete(int catalogid);
}
