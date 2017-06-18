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
</body>
</html>
<jsp:include page="foot.jsp"/>