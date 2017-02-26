package com.myblog.realm;

import javax.annotation.Resource;

import com.myblog.entity.Blog;
import com.myblog.service.IAdminService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.myblog.entity.Admin;
import com.myblog.service.IBlogService;

/**
 * @author Ni Shengwu
 * @Description
 */
public class MyRealm extends AuthorizingRealm {

    @Resource
    private IAdminService adminService;


    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {

        return null;
    }


    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken token) throws AuthenticationException {

        String adminname = (String) token.getPrincipal();
        Admin admin = adminService.getByAdminname(adminname);
        if (admin != null) {
            SecurityUtils.getSubject().getSession().setAttribute("admin", admin);
            AuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                    admin.getAdminname(), admin.getAdminpasswd(), "MyRealm"
            );
            return authenticationInfo;
        } else {
            return null;
        }
    }

}
