package com.myblog.dao;

import com.myblog.entity.Admin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
    @Delete({
            "delete from admin",
            "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    @Insert({
            "insert into admin (id, adminname, ",
            "adminpasswd)",
            "values (#{id,jdbcType=INTEGER}, #{adminname,jdbcType=VARCHAR}, ",
            "#{adminpasswd,jdbcType=VARCHAR})"
    })
    int insert(Admin record);

    int insertSelective(Admin record);

    @Select({
            "select",
            "id, adminname, adminpasswd",
            "from admin",
            "where id = #{id,jdbcType=INTEGER}"
    })
    @ResultMap("BaseResultMap")
    Admin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Admin record);

    @Update({
            "update admin",
            "set adminname = #{adminname,jdbcType=VARCHAR},",
            "adminpasswd = #{adminpasswd,jdbcType=VARCHAR}",
            "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Admin record);


    Admin getAdminname(String name);
    Admin getAdminData();
}