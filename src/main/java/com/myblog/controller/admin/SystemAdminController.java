package com.myblog.controller.admin;

import com.myblog.entity.Admin;
import com.myblog.service.IAdminService;
import com.myblog.util.ResponseUtil;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Zephery on 2017/1/18.
 */
@Controller
@RequestMapping("/admin/system")
public class SystemAdminController {

    @Resource
    private IAdminService adminService;

    /**
     * Ë¢ÐÂÏµÍ³»º´æ
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/refreshSystem")
    public String refreshSystem(HttpServletResponse response, HttpServletRequest request) throws Exception {
        ServletContext application = RequestContextUtils.getWebApplicationContext(request).getServletContext();
        Admin admin = adminService.getAdminData();
        admin.setAdminpasswd(null);
        application.setAttribute("admin", admin);
        JSONObject result = new JSONObject();
        result.put("success", true);
        ResponseUtil.write(response, result);
        return null;
    }
}
