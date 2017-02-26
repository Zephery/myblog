package com.myblog.service;

import com.myblog.entity.Image;

import java.util.List;

/**
 * Created by Zephery on 2016/8/8.
 */
public interface IImageservice {
    public List<Image> getbanner(String banner);
    public List<Image> getGalleryImage();
    public List<Image> getNewImages(String banner);
    public void addimage(Image image);
}
