<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="indexactive" value="active"/>
    <jsp:param name="title" value="Home"/>
</jsp:include>
<!--//header-->
<html>
<head>
    <link href="${pageContext.request.contextPath}/static/js/mousepicture/css/lanrenzhijia.css" type="text/css"
          rel="stylesheet"/>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/static/js/wowslider/engine1/style.css"/>
    <script src="${pageContext.request.contextPath}/js/responsiveslides.min.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#slider").responsiveSlides({
                auto: true,
                nav: true,
                speed: 500,
                namespace: "callbacks",
                pager: false
            });
        });
    </script>
</head>
<body>
<div class="slider">
    <div id="wowslider-container1">
        <div class="ws_images">
            <ul>
                <c:forEach var="banner" items="${banners}">
                    <li><a href="" target="_self">
                        <img src="${banner.imagepath}"
                             alt="${banner.imagename}" title="${banner.datetime}" id="wows1_0"
                             style="height: 120%"/>
                    </a>${banner.content}
                    </li>
                </c:forEach>
            </ul>
        </div>
        <div class="ws_script" style="position:absolute;left:-99%"><a href="http://wowslider.com/vi">css slider</a> by
            WOWSlider.com v8.7
        </div>
        <div class="ws_shadow"></div>
    </div>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/js/wowslider/engine1/wowslider.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/js/wowslider/engine1/script.js"></script>
</div>
<div class="clearfix"></div>
<div class="banner-bottom">
    <div class="container">
        <h3 style="font-weight: bolder">最新图片</h3>
        <p>${imagetimeline}</p>
        <br>
        <div class="row">
            <div class="wrap">
                <ul class="item1">
                    <c:forEach var="image" items="${images}">
                        <%--<div class="col-md-4 bb-grids">--%>
                        <%--<a href="#x"> <img src="${pageContext.request.contextPath}/images/${image.imagepath}" alt=''/>--%>
                        <%--<p><b>${image.imagename}</b>${image.content}</p>--%>
                        <%--</a>--%>
                        <%--</div>--%>
                    <li>
                        <img src="${image.imagepath}"
                             style="width: 100%;height: 100%;position: absolute;margin-top: 4px"/>
                        <div>
                            <h3>${image.imagename}</h3>
                            <p style="font-weight:bold;">${image.content}</p>
                        </div>
                    </li>
                    </c:forEach>
                    <script src="${pageContext.request.contextPath}/static/js/mousepicture/js/lanrenzhijia.js"></script>

            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<div class="banner-bottom">
    <div class="container">
        <h3>Temporibus autem quibusdam et aut officiis debitis aut rerum </h3>
        <p>Donec vitae tellus non sem vulputate cursus. Aliquam erat volutpat. Proin ut est et sem rhoncus fringilla
            laoreet at mauris. Integer posuere massa metus. Etiam tortor dui, consectetur quis fringilla nec, suscipit
            non nibh. Cras velit mauris, consectetur sit amet congue a, dictum vehicula lorem. Etiam imperdiet aliquam
            sapien, dignissim dapibus lectus imperdiet non. </p>
    </div>
</div>
<div class="features">
    <div class="container">
        <h3 style="font-weight: bolder">最新博客</h3>
        <div class="row">
            <c:forEach var="blog" items="${blogs}">
                <div class="col-sm-6 col-md-4 featur-grids">
                    <div class="thumbnail feature-thmbnl">
                        <h4>${blog.title}</h4>
                        <c:forEach var="image" items="${blog.imageList}">
                            ${image }
                        </c:forEach>
                        <div class="caption">
                            <p>${blog.summary}</p>
                            <a href="getBlogDetail.html?blogid=${blog.blogid}" class="btn btn-primary hvr-rectangle-in">Read
                                More</a>
                        </div>
                    </div>
                </div>
            </c:forEach>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
</body>
</html>
<jsp:include page="foot.jsp"/>