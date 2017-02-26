<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="galleryactive" value="active"/>
    <jsp:param name="title" value="Gallery"/>
</jsp:include>
<!--//header-->

<!DOCTYPE html>
<html lang="zh" class="no-js">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading Effects for Grid Items | Demo 3</title>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/static/js/masonrydemo/css/default.css"/>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/static/js/masonrydemo/css/component.css"/>
    <script src="${pageContext.request.contextPath}/static/js/masonrydemo/js/modernizr.custom.js"></script>


    <%--<link rel="stylesheet" href="${pageContext.request.contextPath}/static/content-big/css/common.css" type="text/css"/>--%>
    <style type="text/css">
        /*自适应圆角投影*/
        .round_shade_box {
            width: 1px;
            height: 1px;
            font-size: 0;
            display: none;
            _background: white;
            _border: 1px solid #cccccc;
        }

        .round_shade_top {
            margin: 0 12px 0 10px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) repeat-x -20px -40px;
            _background: white;
            zoom: 1;
        }

        .round_shade_topleft {
            width: 11px;
            height: 10px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat 0 0;
            _background: none;
            float: left;
            margin-left: -11px;
            position: relative;
        }

        .round_shade_topright {
            width: 12px;
            height: 10px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat -29px 0;
            _background: none;
            float: right;
            margin-right: -12px;
            position: relative;
        }

        .round_shade_centerleft {
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat 0 -1580px;
            _background: none;
        }

        .round_shade_centerright {
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat right -80px;
            _background: none;
        }

        .round_shade_center {
            font-size: 14px;
            margin: 0 12px 0 10px;
            padding: 10px;
            background: white;
            letter-spacing: 1px;
            line-height: 1.5;
        }

        .round_shade_bottom {
            margin: 0 12px 0 11px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) repeat-x -20px bottom;
            _background: white;
            zoom: 1;
        }

        .round_shade_bottomleft {
            width: 11px;
            height: 10px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat 0 -30px;
            _background: none;
            float: left;
            margin-left: -11px;
            position: relative;
        }

        .round_shade_bottomright {
            width: 12px;
            height: 10px;
            background: url(${pageContext.request.contextPath}/static/content-big/image/zxx_round_shade.png) no-repeat -29px -30px;
            _background: none;
            float: right;
            margin-right: -12px;
            position: relative;
        }

        .round_shade_top:after, .round_shade_bottom:after, .zxx_zoom_box:after {
            display: block;
            content: ".";
            height: 0;
            clear: both;
            overflow: hidden;
            visibility: hidden;
        }

        .round_box_close {
            padding: 2px 5px;
            font-size: 12px;
            color: #ffffff;
            text-decoration: none;
            border: 1px solid #cccccc;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            background: #000000;
            opacity: 0.8;
            filter: alpha(opacity=80);
            position: absolute;
            right: -5px;
            top: -5px;
        }

        .round_box_close:hover {
            opacity: 0.95;
            filter: alpha(opacity=95);
        }

        /*自适应圆角投影结束*/
        .zxx_zoom_left {
            width: 45%;
            float: left;
            margin-top: 20px;
            border-right: 1px solid #dddddd;
        }

        .zxx_zoom_left h4 {
            margin: 5px 0px 15px 5px;
            font-size: 1.1em;
        }

        .small_pic {
            font-size: 120px;
            text-align: center;
            zoom: 1;
            vertical-align: middle;
        }

        .small_pic img {
            padding: 3px;
            background: #ffffff;
            border: 1px solid #cccccc;
            vertical-align: middle;
        }

        .zxx_zoom_right {
            width: 50%;
            float: left;
            margin-top: 20px;
            padding-left: 2%;
        }

        .zxx_zoom_right h4 {
            margin: 5px 0px;
            font-size: 1.1em;
        }

        .zxx_zoom_right p.zxx_zoom_word {
            line-height: 1.5;
            font-size: 1.05em;
            letter-spacing: 1px;
            margin: 0 0 35px;
            padding-top: 5px;
        }
    </style>
    <%--<script type="text/javascript"--%>
            <%--src="${pageContext.request.contextPath}/static/content-big/js/jquery-1.2.6.pack.js"></script>--%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/content-big/js/content_zoom.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('div.small_pic a').fancyZoom({scaleImg: true, closeOnClick: true});
            $('#zoom_word_1').fancyZoom({width: 600, height: 250});
            $('#zoom_word_2').fancyZoom();
            $('#zoom_flash').fancyZoom();
        });
    </script>


</head>
<body>
<div class="container" style="background-color: #ffffff">
    <header>
        <h1>Loading Effects for Grid Items <span>with CSS Animations</span></h1>
    </header>

    <ul class="grid effect-3" id="grid">
        <c:forEach items="${images}" var="image">
            <li>
                <div class="small_pic">
                    <a href="#test${image.imageid}">
                        <img src="${image.imagepath}"/>
                    </a>
                </div>
                <div id="test${image.imageid}" style="display:none;"><img
                        src="${image.imagepath}"/>${image.content} -${image.datetime}</div>
            </li>

        </c:forEach>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>

        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>
        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>
        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>
        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>
        <li><a href="http://www.htmleaf.com/"><img src="${pageContext.request.contextPath}/images/55.jpg"></a>
        </li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/11.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/1.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/11.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/1.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/11.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/1.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/11.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/1.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/12.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/13.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/10.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/11.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/14.png"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/1.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/4.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/6.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/7.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/8.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/9.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/3.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/5.jpg"></a></li>
        <li><a href="http://www.htmleaf.com/"><img
                src="${pageContext.request.contextPath}/static/js/masonrydemo/images/2.jpg"></a></li>
    </ul>
</div>
<script src="${pageContext.request.contextPath}/static/js/masonrydemo/js/masonry.pkgd.min.js"></script>
<script src="${pageContext.request.contextPath}/static/js/masonrydemo/js/imagesloaded.js"></script>
<script src="${pageContext.request.contextPath}/static/js/masonrydemo/js/classie.js"></script>
<script src="${pageContext.request.contextPath}/static/js/masonrydemo/js/AnimOnScroll.js"></script>
<script>
    new AnimOnScroll(document.getElementById('grid'), {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.2
    });
</script>
</body>
</html>


<!--footer-->
<jsp:include page="foot.jsp"/>