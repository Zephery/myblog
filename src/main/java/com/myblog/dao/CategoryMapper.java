package com.myblog.dao;

import com.myblog.entity.Category;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryMapper {
    @Delete({
            "delete from category",
            "where categoryid = #{categoryid,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer categoryid);

    @Insert({
            "insert into category (categoryid, categoryname, ",
            "categorydescription)",
            "values (#{categoryid,jdbcType=INTEGER}, #{categoryname,jdbcType=VARCHAR}, ",
            "#{categorydescription,jdbcType=VARCHAR})"
    })
    int insert(Category record);

    int insertSelective(Category record);

    @Select({
            "select",
            "categoryid, categoryname, categorydescription",
            "from category",
            "where categoryid = #{categoryid,jdbcType=INTEGER}"
    })
    @ResultMap("BaseResultMap")
    Category selectByPrimaryKey(Integer categoryid);

    int updateByPrimaryKeySelective(Category record);

    @Update({
            "update category",
            "set categoryname = #{categoryname,jdbcType=VARCHAR},",
            "categorydescription = #{categorydescription,jdbcType=VARCHAR}",
            "where categoryid = #{categoryid,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Category record);

    @Select("select * from category")
    @Results({
            @Result(property = "categoryid", column = "categoryid", javaType = Integer.class),
            @Result(property = "categoryname", column = "categoryname", javaType = String.class),
            @Result(property = "categorydescription",column = "categorydescription",javaType = String.class)
    })
    List<Category> getAll();             //获取所有类别

    @Select("select categoryname from category where categoryid=#{categoryid,jdbcType=INTEGER}")
    @Result(property = "categoryname",column = "categoryname",javaType = String.class)
    String getCategoryname(Integer categoryid);
}