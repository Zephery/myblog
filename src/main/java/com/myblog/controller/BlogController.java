package com.myblog.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.myblog.entity.Blog;
import com.myblog.entity.Category;
import com.myblog.lucene.BlogIndex;
import com.myblog.service.IBlogService;
import com.myblog.service.ICategoryService;
import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by Zephery on 2016/8/5.
 */
@Controller
@RequestMapping("/")
public class BlogController {
    private final static Logger logger = LoggerFactory.getLogger(BlogController.class);
    @Resource
    private IBlogService blogService;

    @Resource
    private ICategoryService categoryService;

    private BlogIndex blogIndex = new BlogIndex();

    @RequestMapping(value = "blog")
    public ModelAndView toshowarticle(HttpServletRequest request) {       //博客主页
        String page = request.getParameter("pagenum");
        String categoryid = request.getParameter("categoryid");
        Integer pagenum;
        if (StringUtils.isEmpty(page)) {
            pagenum = 1;
        } else {
            pagenum = Integer.parseInt(page);
        }
        PageHelper.startPage(pagenum, 10);
        List<Blog> lists;
        if (StringUtils.isEmpty(categoryid)) {
            lists = blogService.getAllWithoutCategory();
        } else {
            lists = blogService.getblogsbycatalogid(Integer.parseInt(categoryid));
        }
        ModelAndView modelAndView = new ModelAndView();
        for (int i = 0; i < lists.size(); i++) {
            try {
                int categoryresult = blogService.getcatalogidbyblogid(lists.get(i).getBlogid());
                lists.get(i).setCategory(categoryService.selectByPrimaryKey(categoryresult));
                String datestr = lists.get(i).getDatetime().toString();
                Date date = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", Locale.UK).parse(datestr);
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String sDate = sdf.format(date);
                lists.get(i).setFormateDate(sDate);
            } catch (Exception e) {
                logger.error("datetimeparse error" + e);
            }
        }
        for (Blog blog : lists) {
            List<String> imagesList = blog.getImageList();
            String blogInfo = blog.getContent();
            Document doc = Jsoup.parse(blogInfo);
            Elements jpgs = doc.select("img[src$=.jpg]"); //picture
            for (int i = 0; i < jpgs.size(); i++) {
                Element jpg = jpgs.get(i);
                if (jpg != null) {
                    imagesList.add(jpg.toString());
                    if (i == 2) {
                        break;
                    }
                }
            }
        }
        List<Category> categories = categoryService.getAll();
        modelAndView.addObject("categories", categories);
        PageInfo<Blog> blogs = new PageInfo<>(lists);
        modelAndView.addObject("blogs", blogs.getList());
        modelAndView.addObject("pages", blogs.getPages());
        modelAndView.addObject("pageNum", blogs.getPageNum());
        modelAndView.addObject("categoryid", categoryid);
        modelAndView.setViewName("blog");
        return modelAndView;
    }

    @RequestMapping("getrecentblog")
    public ModelAndView getrecentblog() {             //最新博客
        ModelAndView modelAndView = new ModelAndView();
        List<Blog> blogs = blogService.getNewBlog();
        modelAndView.addObject("blogs", blogs);
        modelAndView.setViewName("recentpost");
        return modelAndView;
    }

    @RequestMapping("getBlogDetail")
    public ModelAndView getBlogDetail(Integer blogid) {       //博客具体内容
        ModelAndView modelAndView = new ModelAndView();
        Blog blog = blogService.getBlogDetail(blogid);
        List<Category> categories = categoryService.getAll();
        modelAndView.addObject("categories", categories);
        modelAndView.addObject("blog", blog);
        modelAndView.setViewName("singlepage");
        return modelAndView;
    }

    @RequestMapping("/search")
    public ModelAndView search(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "pagenum", required = false) Integer pagenum) {
        ModelAndView modelAndView = new ModelAndView();
        try {
            List<Blog> lists = blogIndex.searchBlog(q);
            for (int i = 0; i < lists.size(); i++) {
                String datestr = lists.get(i).getDatetime().toString();
                Date date = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", Locale.UK).parse(datestr);
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String sDate = sdf.format(date);
                lists.get(i).setFormateDate(sDate);
            }
            if (pagenum == null) {
                pagenum = 1;
            }
            PageHelper.startPage(pagenum, 10);
            List<Category> categories = categoryService.getAll();
            modelAndView.addObject("categories", categories);
            PageInfo<Blog> blogs = new PageInfo<>(lists);
            blogs.setPageSize(10);
            blogs.setSize(10);
            blogs.setPages(lists.size() / 10 == 0 ? lists.size() / 10 : lists.size() / 10 + 1);
            modelAndView.addObject("blogs", lists.subList((pagenum - 1) * 10, lists.size() / 10 < pagenum ? lists.size() : pagenum * 10));
            modelAndView.addObject("pages", blogs.getPages());
            modelAndView.addObject("pageNum", pagenum);
            modelAndView.addObject("q", q);
            modelAndView.setViewName("searchresult");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("search" + e);
        }
        return modelAndView;
    }

    @RequestMapping("/board")
    public ModelAndView getboard() {
        ModelAndView modelAndView = new ModelAndView();
        try {
            modelAndView.setViewName("board");
        } catch (Exception e) {
            logger.error("getboard" + e);
        }
        return modelAndView;
    }

}
