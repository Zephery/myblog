package com.myblog.service.impl;

import com.myblog.dao.AdminMapper;
import com.myblog.entity.Admin;
import com.myblog.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Zephery on 2016/6/11.
 */
@Service("adminService")
public class AdminServiceImpl implements IAdminService {
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Admin getByAdminname(String adminname) {
        return adminMapper.getAdminname(adminname);
    }

    @Override
    public Admin getAdminData() {
        return adminMapper.getAdminData();
    }

    @Override
    public int updateAdmin(Admin admin) {
        return adminMapper.updateByPrimaryKey(admin);
    }

    //public Admin validatelogin(String adminname, String password) {
//        return adminMapper.validate(adminname, password);
//    }

}
