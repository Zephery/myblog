<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2016/8/12
  Time: 21:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="boardactive" value="active"/>
    <jsp:param name="title" value="Board"/>
</jsp:include>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>留言板</title>
</head>
<body>
<div class="blog">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="index.html">主页</a></li>
            <li>留言板</li>
        </ol>
        <article class="aboutcon">
        <span><strong>
            欢迎大家留言
        </strong>
        </span>
            <div class="about left">
                <ul>
                    <!--多说代码嵌入-->
                    <!-- 多说评论框 start -->
                    <div class="ds-thread" data-thread-key="board" data-title="留言板" data-url=""></div>
                    <!-- 多说评论框 end -->
                    <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
                    <script type="text/javascript">
                        var duoshuoQuery = {short_name: "zephery"};
                        (function () {
                            var ds = document.createElement('script');
                            ds.type = 'text/javascript';
                            ds.async = true;
                            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
                            ds.charset = 'UTF-8';
                            (document.getElementsByTagName('head')[0]
                            || document.getElementsByTagName('body')[0]).appendChild(ds);
                        })();
                    </script>
                    <!-- 多说公共JS代码 end -->
                </ul>
            </div>
        </article>
    </div>
</div>
</body>
</html>
<jsp:include page="foot.jsp"/>