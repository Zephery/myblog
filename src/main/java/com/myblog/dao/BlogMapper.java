package com.myblog.dao;

import com.myblog.entity.Blog;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogMapper {
    @Delete({
            "delete from blog",
            "where blogid = #{blogid,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer blogid);

    @Insert({
            "insert into blog (blogid, title, ",
            "summary, content, ",
            "picture, datetime, ",
            "categoryid)",
            "values (#{blogid,jdbcType=INTEGER}, #{title,jdbcType=VARCHAR}, ",
            "#{summary,jdbcType=VARCHAR}, #{content,jdbcType=VARCHAR}, ",
            "#{picture,jdbcType=VARCHAR}, #{datetime,jdbcType=TIMESTAMP}, ",
            "#{category.categoryid,jdbcType=INTEGER})"     //注意这里，有bug
    })
    int insert(Blog record);                  //增加博客

    int insertSelective(Blog record);

    @Select({
            "select",
            "b.blogid, b.title, b.summary, b.content, b.picture, b.datetime, c.categoryid,c.categoryname",
            "from blog b,category c",
            "where b.blogid = #{blogid,jdbcType=INTEGER} and b.categoryid=c.categoryid"
    })
    @ResultMap("BaseResultMap")
    Blog selectByPrimaryKey(Integer blogid);

    int updateByPrimaryKeySelective(Blog record);

    @Update({
            "update blog",
            "set title = #{title,jdbcType=VARCHAR},",
            "summary = #{summary,jdbcType=VARCHAR},",
            "content = #{content,jdbcType=VARCHAR},",
            "picture = #{picture,jdbcType=VARCHAR},",
            "datetime = #{datetime,jdbcType=TIMESTAMP},",
            "categoryid = #{category.categoryid,jdbcType=INTEGER}",
            "where blogid = #{blogid,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Blog record);

//这是个bug，不要这么选择
//    @Select("select b.blogid, b.title, b.summary, b.content, b.picture, b.datetime, c.categoryid,c.categoryname,b.clickHit" +
//            " from blog b,category c " +
//            "order by b.datetime desc")
//    @ResultMap("BaseResultMap")
//    List<Blog> getBlogByTime();          //blog首页根据时间获取所有博客

    @Select({
            "select",
            "b.blogid, b.title, b.summary, b.content, b.picture, b.datetime, b.categoryid",
            "from blog b",
            "where b.categoryid = #{categoryid,jdbcType=INTEGER}",
            "order by datetime desc"
    })
    @ResultMap("BaseResultMap")
    List<Blog> getblogsbycategoryid(Integer categoryid);   //根据类别选择

    @Select({
            "select",
            "b.categoryid",
            "from blog b",
            "where b.blogid=#{blogid,jdbcType=INTEGER}"
    })
    @Results({
            @Result(property = "categoryid", column = "categoryid", javaType = Integer.class),
    })
    int getcategoryidbyblogid(Integer blogid);   //得到categoryid，分页插件需要用


    List<Blog> getNewBlog();

    @Select("select b.blogid, b.title, b.summary, b.content, b.picture, b.datetime" +
            " from blog b order by b.datetime desc")
    List<Blog> getAllWithoutCategory();
}