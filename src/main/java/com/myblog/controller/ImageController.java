package com.myblog.controller;

import com.myblog.entity.Image;
import com.myblog.service.IImageservice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Zephery on 2017/1/18.
 */
@Controller
public class ImageController {
    @Resource
    private IImageservice iImageservice;
    private final static Logger logger = LoggerFactory.getLogger(ImageController.class);


    @RequestMapping("/gallery")
    public ModelAndView getAllimages() {
        ModelAndView modelAndView=new ModelAndView();
        try {
            List<Image> images = iImageservice.getGalleryImage();
            modelAndView.addObject("images", images);
        } catch (Exception e) {
            logger.error("getAllimages error" + e);
        }
        modelAndView.setViewName("gallery");
        return modelAndView;
    }
}
