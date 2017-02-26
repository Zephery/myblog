package com.myblog.service.impl;

import com.myblog.dao.ImageMapper;
import com.myblog.entity.Image;
import com.myblog.service.IImageservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by Zephery on 2016/8/8.
 */
@Service("iImageservice")
public class ImageServiceImpl implements IImageservice {
    @Autowired
    private ImageMapper imageMapper;

    @Override
    public List<Image> getbanner(String banner) {
        return imageMapper.bannerimage(banner);
    }

    @Override
    public List<Image> getGalleryImage() {
        return imageMapper.getGalleryImage();
    }

    @Override
    public List<Image> getNewImages(String banner) {
        return imageMapper.getNewImages(banner);
    }

    @Override
    public void addimage(Image image) {
        imageMapper.insert(image);
    }
}
