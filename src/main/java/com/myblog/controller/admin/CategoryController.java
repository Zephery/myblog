package com.myblog.controller.admin;

import com.myblog.entity.Category;
import com.myblog.service.IBlogService;
import com.myblog.service.ICategoryService;
import com.myblog.util.ResponseUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Zephery on 2016/8/17.
 */
@Controller
@RequestMapping("admin")
public class CategoryController {
    @Resource
    private ICategoryService categoryService;
    @Resource
    private IBlogService blogService;

    @RequestMapping("/categoryManage")
    public ModelAndView listBlogType(HttpServletResponse response) throws Exception {
        List<Category> categories = categoryService.getAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("categories", categories);
        modelAndView.setViewName("admin/categoryManage");
        return modelAndView;
    }

    @RequestMapping("delete")
    public String delete(
            @RequestParam(value = "ids") String ids, HttpServletResponse response
    ) throws Exception {
        String[] idStr = ids.split(",");
        JSONObject result = new JSONObject();
//        for(int i=0;i<idStr.length;i++){
//            if(categoryService.ge)
//        }
        result.put("sucees", true);
        ResponseUtil.write(response, result);
        return null;
    }

    @RequestMapping("updatecategory")
    public ModelAndView updatecategory(Category category) {
        if (StringUtils.isEmpty(category.getCategoryname())) {
            categoryService.delete(category.getCategoryid());
        }
        categoryService.update(category);
        List<Category> categories = categoryService.getAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("categories", categories);
        modelAndView.setViewName("admin/categoryManage");
        return modelAndView;
    }

    @RequestMapping("addcategory")
    public String addcategory(Category category) {
        categoryService.insert(category);
        return "redirect:categoryManage.html";
    }

}
