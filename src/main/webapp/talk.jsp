<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="touractive" value="active"/>
    <jsp:param name="title" value="杂言碎语"/>
</jsp:include>
<!--//header-->


<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blueprint: Vertical Timeline</title>
    <meta name="description" content="Blueprint: Vertical Timeline"/>
    <meta name="keywords"
          content="timeline, vertical, layout, style, component, web development, template, responsive"/>
    <meta name="author" content="Codrops"/>
    <link rel="stylesheet" type="text/css" href="css/default.css"/>
    <link rel="stylesheet" type="text/css" href="css/component.css"/>
    <script src="js/modernizr.custom.js"></script>
</head>
<body>
<div class="container">
    <header class="clearfix">
        <h1 style="margin: auto 45%">时间轴</h1>
    </header>
    <div class="main">
        <ul class="cbp_tmtimeline">

            <c:set var="count" value="1"/>
            <c:forEach var="talk" items="${talks}">

                <c:choose>
                    <c:when test="${count%2==0}">
                        <li>
                            <time class="cbp_tmtime" datetime="2013-04-10 18:30"><span>4/10/13</span> <span>00</span>
                            </time>
                            <div class="cbp_tmicon cbp_tmicon-phone"></div>
                            <div class="cbp_tmlabel">
                                <h2>Ricebean black-eyed pea</h2>
                                    ${talk.content}
                            </div>
                        </li>
                    </c:when>
                    <c:when test="${count%2!=0}">
                        <li>
                            <time class="cbp_tmtime" datetime="2013-04-11T12:04"><span>4/11/13</span> <span>11</span>
                            </time>
                            <div class="cbp_tmicon cbp_tmicon-screen"></div>
                            <div class="cbp_tmlabel">
                                <h2>Greens radish arugula</h2>
                                    ${talk.content}
                            </div>
                        </li>
                    </c:when>
                </c:choose>
                <c:set var="count" value="${count+1}"/>
            </c:forEach>

        </ul>
    </div>
</div>
</body>
</html>
<!--footer-->
<jsp:include page="foot.jsp"/>