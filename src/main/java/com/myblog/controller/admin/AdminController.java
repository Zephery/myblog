package com.myblog.controller.admin;

import com.myblog.entity.Admin;
import com.myblog.entity.Image;
import com.myblog.service.IAdminService;
import com.myblog.service.IImageservice;
import com.myblog.util.CryptographyUtil;
import com.myblog.util.ImageUtil;
import com.myblog.util.QiniuUtil;
import com.myblog.util.ResponseUtil;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.apache.shiro.SecurityUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * Created by Zephery on 2016/8/8.
 */
@Controller
@RequestMapping("/admin")
public class AdminController {
    private final static Logger logger = LoggerFactory.getLogger(AdminController.class);
    @Resource
    private IAdminService adminService;
    @Resource
    private IImageservice imageservice;

    @RequestMapping("/modifyPassword")      //重置密码
    public String modifypassword(@RequestParam("password") String password,
                                 HttpServletResponse response) throws Exception {
        Admin admin = new Admin();
        admin.setAdminpasswd(CryptographyUtil.md5(password, "test"));
        int resultTotal = adminService.updateAdmin(admin);
        JSONObject result = new JSONObject();
        if (resultTotal > 0) {
            result.put("success", true);
        } else {
            result.put("success", false);
        }
        ResponseUtil.write(response, result);
        return null;
    }

    @RequestMapping("logout")
    public String logout() throws Exception {
        SecurityUtils.getSubject().logout();
        return "redirect:/admin/login.jsp";
    }

    @RequestMapping("uploadpic")
    public ModelAndView uploadpic() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin/uploadimage");
        return modelAndView;
    }

    @RequestMapping("uploadimage")
    public ModelAndView uploadimage(HttpServletRequest request, @RequestParam("file") MultipartFile attach,
                                    HttpServletResponse response) {
        Image image = new Image();
        String imagename = request.getParameter("imagename");
        String banner = request.getParameter("banner");
        String content = request.getParameter("content");
        ModelAndView modelAndView = new ModelAndView();
        try {
            image.setImagename(imagename);
            image.setBanner(banner);
            image.setContent(content);
            image.setDatetime(DateTime.now().toString("yyyy-MM-dd HH:mm:ss"));
            image.setLove(0);

            //将图片复制到本地，如果超过2m进行压缩，否则上传，再然后删除本地文件
            request.setCharacterEncoding("utf-8");
            response.setHeader("Content-Type", "text/html");
            String rootPath = request.getSession().getServletContext().getRealPath("/images");
            /**
             * 文件路径不存在则需要创建文件路径
             */
            File filePath = new File(rootPath);
            if (!filePath.exists()) {
                filePath.mkdirs();
            }
            //最终文件名
            File realFile = new File(rootPath + File.separator + attach.getOriginalFilename());
            String key = realFile.toString();
            String name = attach.getOriginalFilename();
            FileUtils.copyInputStreamToFile(attach.getInputStream(), realFile);
            ImageUtil.thimage(realFile);
            QiniuUtil.putFile("images", "images/" + name, key);
            FileUtils.deleteQuietly(realFile);
            String pic_url = "http://ohlrxdl4p.bkt.clouddn.com/images/" + name;   //保持URL
            image.setImagepath(pic_url);
            imageservice.addimage(image);
            modelAndView.setViewName("admin/success");
        } catch (Exception e) {
            logger.error("上传图片错误" + e);
        }
        return modelAndView;
    }

    @RequestMapping("uploadpicture")
    public ModelAndView getuploadpicture(MultipartFile attach) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin/success");
        return modelAndView;
    }

}
