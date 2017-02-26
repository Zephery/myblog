package com.myblog.listener;

import com.myblog.entity.Admin;
import com.myblog.service.IAdminService;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by Zephery on 2016/8/8.
 */
@Component
public class InitAdminData implements ServletContextListener,ApplicationContextAware{
    private static ApplicationContext applicationContext;
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println(applicationContext);
        //ÏÈ»ñÈ¡servletÉÏÏÂÎÄ
        ServletContext application = sce.getServletContext();

        //¸ù¾ÝspringµÄÉÏÏÂÎÄ»ñÈ¡bloggerServiceÕâ¸öbean
        //BloggerService bloggerService = (BloggerService) applicationContext.getBean("bloggerService");
        IAdminService adminService=(IAdminService)applicationContext.getBean("adminService");
        //»ñÈ¡²©Ö÷ÐÅÏ¢
        //Blogger blogger = bloggerService.getBloggerData();
        Admin admin=adminService.getAdminData();
        //ÓÉÓÚÃÜÂëÒ²»ñÈ¡µ½ÁË£¬±È½ÏÃô¸Ð£¬ÎÒÃÇÒ²²»ÐèÒªÕâ¸ö£¬ËùÒÔ°ÑÃÜÂëÇå¿Õµô
        //blogger.setPassword(null);
        admin.setAdminpasswd(null);
        //½«²©Ö÷ÐÅÏ¢´æÈëapplicationÓòÖÐ
        application.setAttribute("admin", admin);

//        //Í¬ÉÏ£¬»ñÈ¡ÓÑÇéÁ´½ÓÐÅÏ¢
//        LinkService linkService = (LinkService) applicationContext.getBean("linkService");
//        List<Link> linkList = linkService.getLinkData();
//        application.setAttribute("linkList", linkList);
//
//        //Í¬ÉÏ£¬»ñÈ¡²©¿ÍÀà±ðÐÅÏ¢
//        BlogTypeService blogTypeService = (BlogTypeService) applicationContext.getBean("blogTypeService");
//        List<BlogType> blogTypeList = blogTypeService.getBlogTypeData();
//        application.setAttribute("blogTypeList", blogTypeList);
//
//        //Í¬ÉÏ£¬»ñÈ¡²©¿ÍÐÅÏ¢£¬°´ÕÕÊ±¼ä·ÖÀàµÄ
//        BlogService blogService = (BlogService) applicationContext.getBean("blogService");
//        List<Blog> blogTimeList = blogService.getBlogData();
//        application.setAttribute("blogTimeList", blogTimeList);
    }

    public void contextDestroyed(ServletContextEvent sce) {
        // TODO Auto-generated method stub

    }

    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        InitAdminData.applicationContext = applicationContext;
    }

}
