<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2016/8/13
  Time: 9:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<script type="text/javascript">
    $(function () {
        $(".posts-right p").each(function () {
            var maxwidth = 60;
            var text = $(this).text();
            if ($(this).text().length > maxwidth) {
                $(this).text($(this).text().substring(0, maxwidth));
                $(this).html($(this).html() + "..." + "<a href='###'>click to open</a>");
            }

            $(this).find("a").click(function () {
                $(this).parent().text(text);
            })
        })
    })
</script>
<div class="recent-posts">
    <h4>Recent posts</h4>
    <c:forEach var="blog" items="${blogs}">
        <div class="recent-posts-info">
            <div class="posts-left sngl-img">
                <a href="singlepage.jsp"> <img src="images/${blog.picture}" class="img-responsive zoom-img"
                                               alt="" style="width: 150px;height: 175px;"/> </a>
            </div>
            <div class="posts-right">
                <lable>${blog.datetime}</lable>
                <h5><a href="singlepage.jsp">${blog.title}</a></h5>
                <p>${blog.summary}</p>
                <a href="singlepage.jsp" class="btn btn-primary hvr-rectangle-in">Read More</a>
            </div>
            <div class="clearfix"></div>
        </div>
    </c:forEach>

    <div class="clearfix"></div>
</div>