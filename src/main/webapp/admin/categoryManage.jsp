<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>修改博客类别</title>
    <link href="${pageContext.request.contextPath}/css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/static/js/jquery-1.10.2.min.js"></script>
    <script
            src="${pageContext.request.contextPath}/static/js/jquery-tabledit/jquery.tabledit.js"
            type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#tableedit').Tabledit({
                url: '${pageContext.request.contextPath}/admin/updatecategory.do',
                eventType: 'dblclick',
                hideIdentifier: false,
                columns: {
                    identifier: [0, 'categoryid'],
                    editable: [[1, 'categoryname'], [2, 'categorydescription']]
                },
                onAjax: function () {
                    window.location.reload();
                },
                onDraw: function () {
                    $('.tabledit-input').val().trim();
                }
            });
        });
    </script>
</head>
<body>
<table id="tableedit">
    <thead>
    <tr>
        <th>id</th>
        <th>name</th>
        <th>descrption</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="category" items="${categories}">
        <tr>
            <td>${category.categoryid}</td>
            <td>${category.categoryname}</td>
            <td>${category.categorydescription}</td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<form action="${pageContext.request.contextPath}/admin/addcategory.do">
    <table id="table">
        <tr>
            <td>增加</td>
            <td></td>
            <td><label><input type="text" name="categoryname" value="categoryname"/></label></td>
            <td></td>
            <td><label><input type="text" name="categorydescription" value="categorydescription"/></label></td>
            <td></td>
            <td>
                <input type="submit" value="Submit"/>
            </td>
        </tr>
    </table>
</form>
</body>
</html>