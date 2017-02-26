package com.myblog.dao;

import com.myblog.entity.Image;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageMapper {
    @Delete({
            "delete from image",
            "where imageid = #{imageid,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer imageid);

    @Insert({
            "insert into image (imageid, imagename, ",
            "imagepath, banner, ",
            "content, datetime, ",
            "love)",
            "values (#{imageid,jdbcType=INTEGER}, #{imagename,jdbcType=VARCHAR}, ",
            "#{imagepath,jdbcType=VARCHAR}, #{banner,jdbcType=VARCHAR}, ",
            "#{content,jdbcType=VARCHAR}, #{datetime,jdbcType=VARCHAR}, ",
            "#{love,jdbcType=INTEGER})"
    })
    int insert(Image record);

    int insertSelective(Image record);

    @Select({
            "select",
            "imageid, imagename, imagepath, banner, content, datetime, love",
            "from image",
            "where imageid = #{imageid,jdbcType=INTEGER}"
    })
    @ResultMap("BaseResultMap")
    Image selectByPrimaryKey(Integer imageid);

    int updateByPrimaryKeySelective(Image record);

    @Update({
            "update image",
            "set imagename = #{imagename,jdbcType=VARCHAR},",
            "imagepath = #{imagepath,jdbcType=VARCHAR},",
            "banner = #{banner,jdbcType=VARCHAR},",
            "content = #{content,jdbcType=VARCHAR},",
            "datetime = #{datetime,jdbcType=VARCHAR},",
            "love = #{love,jdbcType=INTEGER}",
            "where imageid = #{imageid,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Image record);

    @Select({
            "select",
            "imageid,imagename,imagepath,banner,content,datetime,love",
            "from image",
            "where banner=#{banner,jdbcType=VARCHAR} limit 4"
    })
    List<Image> bannerimage(String banner);

    @Select({
            "select",
            "imageid,imagename,imagepath,content,datetime,love",
            "from image",
            "where banner=0"
    })
    List<Image> getGalleryImage();

    List<Image> getNewImages(String banner);
}