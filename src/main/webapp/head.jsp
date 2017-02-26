<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2016/8/5
  Time: 17:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title><%=request.getParameter("title")%>
    </title>
    <link type="image/x-icon" rel="shortcut icon" href="${pageContext.request.contextPath}/images/66.jpg" />
    <link href="css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
    <link href="css/style.css" type="text/css" rel="stylesheet" media="all">
    <script src="js/jquery.min.js"></script>
    <!-- Custom Theme files -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/social-share-1.0.2/dist/social-share.min.css">
    <script src="${pageContext.request.contextPath}/static/js/social-share-1.0.2/dist/social-share.min.js"></script>
    <script type="application/x-javascript"> addEventListener("load", function () {
        setTimeout(hideURLbar, 0);
    }, false);
    function hideURLbar() {
        window.scrollTo(0, 1);
    } </script>
    <!-- //Custom Theme files -->
    <!-- js -->
    <script src="js/jquery.min.js"></script>
    <!-- //js -->
    <!-- start-smoth-scrolling-->
    <script type="text/javascript" src="js/move-top.js"></script>
    <script type="text/javascript" src="js/easing.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            $(".scroll").click(function (event) {
                event.preventDefault();
                $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
            });
        });
    </script>
    <script>
        $(function () {
            var el = document.getElementById('share-area');
            var links = [{
                plugin: 'github',
                url: 'https://github.com/Zephery'
            }, {
                plugin: 'wechat',
                url: '//yet.another.url',
                color: 'yellow'
            },{
                plugin: 'weibo',
                url:'http://weibo.com/1925306000'
            }];
            var options = {
                size: 'sm'
            };
            window.socialShare(el, links,options);
        })
    </script>
    <!--//end-smoth-scrolling-->
</head>
<body>
<!--navigation-->
<div class="top-nav">
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-left">
                    <li><a href="index.html" class="<%=request.getParameter("indexactive")%>">主页</a></li>
                    <li><a href="blog.html?pagenum=1" class="<%=request.getParameter("blogactive")%>">生活笔记</a></li>
                    <li><a href="tech.jsp" class="<%=request.getParameter("techactive")%>">技术杂谈</a></li>
                    <li><a href="gallery.html" class="<%=request.getParameter("galleryactive")%>">旅行</a></li>
                    <li><a href="testimonial.jsp" class="<%=request.getParameter("testiactive")%>">实时数据</a></li>
                    <li><a href="board.html" class="<%=request.getParameter("boardactive")%>">留言板</a></li>
                    <li><a href="contact.jsp" class="<%=request.getParameter("contactactive")%>">我的简历</a></li>
                    <li><a href="test.jsp" class="<%=request.getParameter("testactive")%>">Test</a></li>
                </ul>
                <div class="social-icons">
                    <div id="share-area" style="margin-top: -5px"></div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </nav>
</div>
<!--navigation-->

<script type="text/javascript">
    function checkData() {

        var q = document.getElementById("q").value.trim();
        if (q == null || q == "") {
            alert("请输入您要查询的关键字！");
            return false;
        } else {
            return true;
        }
    }
</script>
<!--header-->
<div class="header">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.jsp"><img src="images/logo.png" alt=""></a>
        </div>
        <form action="${pageContext.request.contextPath}/search.html"
              class="navbar-form navbar-right" role="search" onsubmit="return checkData()">
            <div class="form-group">
                <input type="text" id="q" name="q" value="${q }" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default" aria-label="Left Align">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </button>
        </form>
    </div>
</div>
</body>