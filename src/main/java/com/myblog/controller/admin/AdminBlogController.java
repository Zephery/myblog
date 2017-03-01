package com.myblog.controller.admin;

import com.myblog.entity.Blog;
import com.myblog.entity.Category;
import com.myblog.entity.Talk;
import com.myblog.lucene.BlogIndex;
import com.myblog.service.IAdminService;
import com.myblog.service.IBlogService;
import com.myblog.service.ICategoryService;
import com.myblog.util.ImageUtil;
import com.myblog.util.QiniuUtil;
import com.myblog.util.ResponseUtil;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.joda.time.DateTime;
import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.List;


/**
 * Created by Zephery on 2016/8/5.
 */
@Controller
@RequestMapping("/admin")
public class AdminBlogController {
    private final static Logger logger = LoggerFactory.getLogger(AdminBlogController.class);
    @Resource
    private IBlogService blogService;
    @Resource
    private IAdminService adminService;
    @Resource
    private ICategoryService categoryService;
    private BlogIndex blogIndex = new BlogIndex();


    @RequestMapping("saveblog")
    public String save(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        String title = request.getParameter("title");
        String content = request.getParameter("htmlcontent");
        String mdcontent=request.getParameter("mdcontent");
        Integer categoryid = Integer.parseInt(request.getParameter("categoryid"));
        String summary = Jsoup.parse(content).text();
        summary = summary.substring(0, summary.length() > 200 ? 200 : summary.length());
        Blog blog = new Blog();
        Category category = new Category();
        category.setCategoryid(categoryid);
        blog.setTitle(title);
        blog.setSummary(summary);
        blog.setContent(content);
        blog.setDatetime(DateTime.now().toDate());
        blog.setCategory(category);
        int resultTotal = 0;
        if (blog.getBlogid() == null) {
            resultTotal = blogService.insert(blog);
        } else {
            resultTotal = blogService.update(blog);
        }
        JSONObject result = new JSONObject();
        if (resultTotal > 0) {
            result.put("success", true);
        } else {
            result.put("success", false);
        }
        //update lucene
        List<Blog> blogs = blogService.getAllWithoutCategory();
        BlogIndex.refreshlucene(blogs);
        ResponseUtil.write(response, result);
        return null;
    }

    @RequestMapping(value = "/savetalk", method = RequestMethod.POST)
    public String savetalk(Talk talk, HttpServletResponse response)
            throws Exception {
        int result = 0;
        if (talk.getTalkid() != null) {
        } else {
            result = 0;
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        ResponseUtil.write(response, result);
        return null;
    }

    @RequestMapping(value = "/writeblog")
    public String writeblog(ModelMap modelMap) {
        List<Category> categoryList = categoryService.getAll();
        modelMap.put("categories", categoryList);
        return "admin/writeblog";
    }

    @RequestMapping(value = "uploadfile", method = RequestMethod.POST)
    public String hello(HttpServletRequest request, HttpServletResponse response,
                        @RequestParam(value = "editormd-image-file", required = false) MultipartFile attach) {
        try {
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
            //下面response返回的json格式是editor.md所限制的，规范输出就OK
            ResponseUtil.write(response, "{\"success\": 1, \"message\":\"上传成功\",\"url\":\"" + pic_url + "\"}");
        } catch (Exception e) {
            try {
                ResponseUtil.write(response, "{\"success\":0}");
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
        return null;
    }

    @RequestMapping("luceneupdate")
    public String luceneupdate() {
        List<Blog> blogs = blogService.getAllWithoutCategory();
        BlogIndex.refreshlucene(blogs);
        return "admin/luceneupdate";
    }
}
