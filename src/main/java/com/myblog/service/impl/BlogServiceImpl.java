package com.myblog.service.impl;

import com.myblog.dao.BlogMapper;
import com.myblog.entity.Blog;
import com.myblog.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Zephery on 2017/1/18.
 */
@Service("blogService")
public class BlogServiceImpl implements IBlogService {
    @Autowired
    private BlogMapper blogMapper;

    @Override
    public int insert(Blog blog) {
        return blogMapper.insert(blog);
    }

    @Override
    public Blog getBlogDetail(Integer blogid) {
        return blogMapper.selectByPrimaryKey(blogid);
    }

    @Override
    public List<Blog> getNewBlog() {
        return blogMapper.getNewBlog();
    }

    @Override
    public List<Blog> getblogsbycatalogid(Integer catalogid) {
        return blogMapper.getblogsbycategoryid(catalogid);
    }

    @Override
    public List<Blog> getAllWithoutCategory() {
        return blogMapper.getAllWithoutCategory();
    }

    @Override
    public List<Blog> getbypage(Integer start, Integer size) {
        List<Blog> list = blogMapper.getAllWithoutCategory();
        list = list.subList(start, start + size);
        return list;
    }

    @Override
    public int getcatalogidbyblogid(Integer id) {
        return blogMapper.getcategoryidbyblogid(id);
    }

    @Override
    public int update(Blog blog) {
        return blogMapper.updateByPrimaryKey(blog);
    }

    @Override
    public int delete(Integer blogid) {
        return blogMapper.deleteByPrimaryKey(blogid);
    }
}
