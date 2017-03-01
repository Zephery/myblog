<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="blogactive" value="active"/>
    <jsp:param name="title" value="Blog"/>
</jsp:include>
<html>
<head>
    <script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <link href="${pageContext.request.contextPath}/static/css/javacss.css" type="text/css" rel="stylesheet" media="all">
</head>
<body>
<!--//header-->
<!--blog-->
<div class="blog">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="index.html">主页</a></li>
            <li>我的博客 &nbsp;${catalogname}</li>
        </ol>
        <div class="col-md-8 blog-left" style="width: 75%;">
            <div class="data_list">
                <div class="datas">
                    <ul>
                        <c:forEach var="blog" items="${blogs}">
                            <li style="margin-bottom: 30px">
                                <h3 class="title"><a href="getBlogDetail.html?blogid=${blog.blogid}">${blog.title}</a>
                                </h3>
                                <br>
                                <span class="summary">摘要: ${blog.summary}...</span>
                                <span class="img">
				  		<c:forEach var="image" items="${blog.imageList}">
                            <a href="getBlogDetail.html?blogid=${blog.blogid}">${image }</a>
                            &nbsp;&nbsp;
                        </c:forEach>
				  	</span>
                                <strong class="info">发表于 ${blog.formateDate}
                                    <span class="ds-thread-count" style="color: #00a0dc"
                                          data-thread-key="${blog.blogid}"
                                          data-count-type="comments"></span>
                                </strong>
                                <!-- 多说js加载开始，一个页面只需要加载一次 -->
                                <script type="text/javascript">
                                    var duoshuoQuery = {short_name: "myblog"};
                                    (function () {
                                        var ds = document.createElement('script');
                                        ds.type = 'text/javascript';
                                        ds.async = true;
                                        ds.src = 'http://static.duoshuo.com/embed.js';
                                        ds.charset = 'UTF-8';
                                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
                                    })();
                                </script>
                            </li>
                            <hr style="height:5px;border:none;border-top:1px dashed gray;padding-bottom:  10px;"/>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4 single-page-right" style="width: 23%">
            <div class="category_blog-ctgry blog-ctgry" id="showcategory">
                <!--        Catalog     -->
                <h4>类别</h4>
                <div class="list-group">
                    <c:forEach var="category" items="${categories}">
                        <a href="blog.html?categoryid=${category.categoryid}"
                           class="list-group-item">${category.categoryname}</a>
                    </c:forEach>
                </div>
            </div>
            <!--评论开始-->
            <div class="comments">
                <h4>最新评论</h4>
                <!-- 多说最新评论 start -->
                <div class="ds-recent-comments" data-num-items="5" data-show-avatars="1" data-show-time="1"
                     data-show-title="1" data-show-admin="1" data-excerpt-length="70"></div>
                <!-- 多说最新评论 end -->
                <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
                <script type="text/javascript">
                    var duoshuoQuery = {short_name: "zephery"};
                    (function () {
                        var ds = document.createElement('script');
                        ds.type = 'text/javascript';
                        ds.async = true;
                        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                            '//static.duoshuo.com/embed.js';
                        ds.charset = 'UTF-8';
                        (document.getElementsByTagName('head')[0]
                        || document.getElementsByTagName('body')[0]).appendChild(ds);
                    })();
                </script>
                <!-- 多说公共JS代码 end -->
            </div>
            <!--评论结束-->
            <div id="testtest" style="position: fixed;margin-top: -1100px;width: 19%;display: none">
                <div class="category_blog-ctgry blog-ctgry">
                    <h4>类别</h4>
                    <div class="list-group">
                        <c:forEach var="category" items="${categories}">
                            <a href="blog.html?categoryid=${category.categoryid}"
                               class="list-group-item">${category.categoryname}</a>
                        </c:forEach>
                    </div>
                </div>
            </div>
            <script type="text/javascript">
                $(document).ready(function () {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() > 1000) {    //当前窗口距离整个页面的顶部距离
                            $("#testtest").fadeIn();
                            console.log($(window).scrollTop());
                        } else {
                            $("#testtest").fadeOut();
                        }
                    });
                });
            </script>
        </div>
        <div class="clearfix"></div>
        <br>
        <br>
        <br>
        <tfoot>
        <tr>
            <td colspan="9" align="center" class="p">
                <c:if test="${pageNum != 1}">
                    <button class="btn btn-default btn-sm"
                            onclick="location.href='search.html?pagenum=1&q=${q}'"
                            style="background: transparent;">首页
                    </button>
                    <button class="btn btn-default btn-sm"
                            onclick="location.href='search.html?pagenum=${pageNum - 1}&q=${q}'"
                            style="background: transparent;">
                        上一页
                    </button>
                </c:if>
                <c:if test="${pages != 1}">
                    <c:forEach var="pageIndex" begin="1" end="${pages}">
                        <c:choose>
                            <c:when test="${pageNum == pageIndex}">
                                <button class="btn btn-default btn-sm" style="border-color: transparent">
                                        ${pageIndex}
                                </button>
                            </c:when>
                            <c:otherwise>
                                <button class="btn btn-default btn-sm,active"
                                        onclick="location.href='search.html?pagenum=${pageIndex}&q=${q}'">${pageIndex}</button>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                </c:if>
                <c:if test="${pageNum != pages}">
                    <button class="btn btn-default btn-sm"
                            onclick="location.href='search.html?pagenum=${pageNum+1}&q=${q}'">
                        下一页
                    </button>
                </c:if>
            </td>
        </tr>
        </tfoot>
    </div>
</div>
</body>
</html>
<!--//blog-->
<!--footer-->
<jsp:include page="foot.jsp"/>