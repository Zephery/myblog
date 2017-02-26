package com.myblog.service;

import com.myblog.entity.Admin;
import org.springframework.stereotype.Service;

/**
 * Created by Zephery on 2016/6/11.
 */

public interface IAdminService {
    public Admin getByAdminname(String adminname);
    public Admin getAdminData();
    public int updateAdmin(Admin admin);
}
