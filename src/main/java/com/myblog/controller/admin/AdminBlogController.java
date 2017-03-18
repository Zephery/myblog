package com.myblog.controller.admin;

import com.myblog.entity.Blog;
import com.myblog.entity.Category;
import com.myblog.entity.PageBean;
import com.myblog.entity.Talk;
import com.myblog.lucene.BlogIndex;
import com.myblog.service.IAdminService;
import com.myblog.service.IBlogService;
import com.myblog.service.ICategoryService;
import com.myblog.util.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
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
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
//        String blog_id = request.getParameter("blogid");
        String title = request.getParameter("title");
        String content = request.getParameter("htmlcontent"); //存储到数据库中的
        String htcontent=request.getParameter("htcontent");    //保留字段
        String mdcontent = request.getParameter("mdcontent");     //纯markdown，保留字段
//        Integer blogid = Integer.parseInt(blog_id);
        Integer categoryid = Integer.parseInt(request.getParameter("categoryid"));
        String summary = Jsoup.parse(content).text();
        summary = summary.substring(0, summary.length() > 200 ? 200 : summary.length());
        Blog blog = new Blog();
        Category category = new Category();
        category.setCategoryid(categoryid);
//        blog.setBlogid(blogid);
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

    @RequestMapping("blogManage")
    public String getblogManage() {
        return "admin/blogManage";
    }

    @RequestMapping("bloglist")
    public String getlist(@RequestParam(value = "page", required = false) String page,
                          @RequestParam(value = "rows", required = false) String rows,
                          Blog s_blog,
                          HttpServletResponse response) throws Exception {
        if (page == null) {
            page = "1";
            rows = "10";
        }
        PageBean pageBean = new PageBean(Integer.parseInt(page), Integer.parseInt(rows));
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("title", StringUtil.formatLike(s_blog.getTitle()));
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        List<Blog> blogList = blogService.getbypage(pageBean.getStart(), pageBean.getPageSize());
//        Long total=blogList.size();
        JSONObject result = new JSONObject();
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
        JSONArray jsonArray = JSONArray.fromObject(blogList, jsonConfig);
        result.put("rows", jsonArray);
        result.put("total", blogService.getAllWithoutCategory().size());
        ResponseUtil.write(response, result);
        return null;
    }

    @RequestMapping("modifyBlog")
    public ModelAndView modifyBlog(
            @RequestParam(value = "blogid", required = true) Integer blogid) {
        ModelAndView modelAndView = new ModelAndView();
        try {
            Blog blog = blogService.getBlogDetail(blogid);
            blog.setContent(StringEscapeUtils.escapeJavaScript(blog.getContent()));
//            blog.setContent(StringEscapeUtils.escapeHtml(blog.getContent()));
            List<Category> categoryList = categoryService.getAll();
            modelAndView.addObject("categories", categoryList);
            modelAndView.addObject("blog", blog);
        } catch (Exception e) {
            logger.error("modifyBlog error" + e);
        }
        modelAndView.setViewName("admin/modifyBlog");
        return modelAndView;
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam(value = "ids") String ids, HttpServletResponse response) throws Exception {
        String[] idsStr = ids.split(",");
        for (int i = 0; i < idsStr.length; i++) {
            blogService.delete(Integer.parseInt(idsStr[i]));
//            blogIndex.deleteIndex(idsStr[i]);
        }
        JSONObject result = new JSONObject();
        result.put("success", true);
        ResponseUtil.write(response, result);
        return null;
    }
}
