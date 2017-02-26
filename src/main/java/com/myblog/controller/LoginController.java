package com.myblog.controller;

import com.myblog.entity.Admin;
import com.myblog.service.IAdminService;
import com.myblog.util.CryptographyUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Zephery on 2017/1/22.
 */
@Controller
public class LoginController {
    @Resource
    private IAdminService adminService;

    @RequestMapping("/login")
    public String login(Admin admin, HttpServletRequest request) {
        try {
            Subject subject = SecurityUtils.getSubject();
            String newPassword = CryptographyUtil.md5(admin.getAdminpasswd(), "test");
            UsernamePasswordToken token = new UsernamePasswordToken(admin.getAdminname(), newPassword);
            subject.login(token);
            return "redirect:/admin/main.jsp";
        } catch (AuthenticationException e) {
            e.printStackTrace();
            request.setAttribute("admin", admin);
            request.setAttribute("errorInfo", "LoginWrong");
            return "login";
        }
    }
}
