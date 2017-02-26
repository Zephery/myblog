package com.myblog.controller;

import com.myblog.entity.Blog;
import com.myblog.entity.Image;
import com.myblog.service.IBlogService;
import com.myblog.service.IImageservice;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Zephery on 2016/8/5.
 */

@Controller
public class IndexController {
    @Resource
    private IBlogService blogService;
    @Resource
    private IImageservice imageservice;

    @RequestMapping("index")
    public ModelAndView index(@RequestParam(value = "page", required = false) String page,
                              @RequestParam(value = "typeId", required = false) String typeId,
                              @RequestParam(value = "releaseDateStr", required = false) String releaseDateStr,
                              HttpServletRequest request)
            throws Exception {
        ModelAndView mav = new ModelAndView();
        List<Image> banners = imageservice.getbanner("1");
        List<Image> images = imageservice.getNewImages("0");
        List<Blog> blogs = blogService.getNewBlog();
        for (Blog blog : blogs) {
            List<String> imagesList = blog.getImageList();
            String blogInfo = blog.getContent();
            Document doc = Jsoup.parse(blogInfo);
            Elements jpgs = doc.select("img[src$=.jpg]"); //picture
            for (int i = 0; i < jpgs.size(); i++) {
                Element jpg = jpgs.get(i);
                if (jpg != null) {
                    imagesList.add(jpg.toString());
                    if (i == 0) {
                        break;
                    }
                }
            }
        }
        String imagetimeline = images.get(0).getDatetime() + "to" + images.get(images.size() - 1).getDatetime();
        mav.addObject("images", images);
        mav.addObject("imagetimeline", imagetimeline);
        mav.addObject("blogs", blogs);
        mav.addObject("banners", banners);
        mav.setViewName("index");
        return mav;
    }
}
