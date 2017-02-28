<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>

<jsp:include page="head.jsp">
    <jsp:param name="blogactive" value="active"/>
    <jsp:param name="title" value="${blog.title}"/>
</jsp:include>
<link rel="stylesheet" type="text/css" href="static/mdeditor/css/editormd.css">
<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="static/mdeditor/editormd.min.js"></script>
<script>
    $(function () {
        editormd("test-editormd", {
            width: "90%",
            height: 640,
            syncScrolling: "single",
            //你的lib目录的路径，
            path: "static/mdeditor/lib/",
            //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
            saveHTMLToTextarea: true,
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "/upload/image"
        });
    });
</script>
<script src="static/mdeditor/lib/marked.min.js"></script>
<!--//header-->
<!--single-page-->
<div class="single-page">
    <div class="container">
            <ol class="breadcrumb">
                <li><a href="blog.html?pagenum=1">博客</a></li>
                <li class="active">${blog.title}</li>
            </ol>
        <div class="col-md-8 single-page-left" style="width: 75%;">
            <div class="single-page-info">
                ${blog.content}
                <%--<div class="comment-icons">--%>
                    <%--<ul>--%>
                        <%--<li><span></span><a href="#">Lorem ipsum dolor sit consectetur</a></li>--%>
                        <%--<li><span class="clndr"></span>MARCH 1, 2013</li>--%>
                        <%--<li><span class="admin"></span> <a href="#">Admin</a></li>--%>
                        <%--<li><span class="cmnts"></span> <a href="#">5 comments</a></li>--%>
                        <%--<li><a href="#" class="like">15</a></li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
            </div>

            <!--//related-posts-->
            <!--多说开始-->
            <!-- 多说评论框 start -->
            <div class="ds-thread" data-thread-key="${blog.blogid}" data-title="${blog.title}"
                 data-url=""></div>
            <!-- 多说评论框 end -->
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

            <!--多说结束-->

        </div>
        <div class="col-md-4 single-page-right" style="width: 23%">

            <div class="category_blog-ctgry blog-ctgry" id="showcategory">
                <!--        Catalog     -->
                <h4>类别</h4>
                <div class="list-group">
                    <c:forEach var="category" items="${categories}">
                        <a href="getCategory.html?categoryid=${category.categoryid}"
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
                            <a href="getCategory.html?categoryid=${category.categoryid}"
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
    </div>
</div>
<!--//single-page-->
<!--footer-->
<jsp:include page="foot.jsp"/>