package com.myblog.entity;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class Blog {
    private Integer blogid;

    private String title;

    private String summary;

    private String content;
    private String mdcontent;
    private String picture;

    private Date datetime;

    private Category category;

    private Integer clickhit;

    private String formateDate;

    private List<String> imageList = new LinkedList<>();

    public Blog(Integer blogid, String title, String summary, String content, String picture, Date datetime,
                Category category, Integer clickhit) {
        this.blogid = blogid;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.picture = picture;
        this.datetime = datetime;
        this.category = category;
        this.clickhit = clickhit;
    }

    public Blog() {
        super();
    }

    public Integer getBlogid() {
        return blogid;
    }

    public void setBlogid(Integer blogid) {
        this.blogid = blogid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary == null ? null : summary.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture == null ? null : picture.trim();
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getClickhit() {
        return clickhit;
    }

    public void setClickhit(Integer clickhit) {
        this.clickhit = clickhit;
    }

    public List<String> getImageList() {
        return imageList;
    }

    public void setImageList(List<String> imageList) {
        this.imageList = imageList;
    }

    public String getFormateDate() {
        return formateDate;
    }

    public void setFormateDate(String formateDate) {
        this.formateDate = formateDate;
    }

    public String getMdcontent() {
        return mdcontent;
    }

    public void setMdcontent(String mdcontent) {
        this.mdcontent = mdcontent;
    }
}