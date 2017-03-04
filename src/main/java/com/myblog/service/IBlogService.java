package com.myblog.service;

import com.myblog.entity.Blog;

import java.util.List;

/**
 * Created by Zephery on 2016/6/11.
 */

public interface IBlogService {
    public int insert(Blog blog);

    public Blog getBlogDetail(Integer blogid);

    public List<Blog> getNewBlog();

    public List<Blog> getblogsbycatalogid(Integer catalogid);

    public List<Blog> getAllWithoutCategory();

    public List<Blog> getbypage(Integer start,Integer size);

    public int getcatalogidbyblogid(Integer id);

    public int update(Blog blog);

    public int delete(Integer blogid);
}
