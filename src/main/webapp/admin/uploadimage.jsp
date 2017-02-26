<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2017/2/17
  Time: 21:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>博客上传</title>
    <link type="image/x-icon" rel="shortcut icon" href="${pageContext.request.contextPath}/images/66.jpg" />
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/static/bootstrap3/css/bootstrap.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/ajaxfileupload/jquery.ajaxfileupload.js"></script>
</head>
<body>
<form action="${pageContext.request.contextPath}/admin/uploadimage.html" enctype="multipart/form-data" method="post">
    <table>
        <tr>
            <td>图片名字</td>
            <td><label><input type="text" id="title" name="imagename" style=""/></label></td>
        </tr>
        <tr>
            <td>上传路径</td>
            <td><label><input type="file" name="file"/></label></td>
        </tr>
        <tr>
            <td><label>是否是banner</label></td>
            <td><label><input type="text" name="banner" value="0"></label></td>
        </tr>
        <tr>
            <td>content</td>
            <td><label><input type="text" name="content"/> </label></td>
        </tr>
        <tr>
            <td>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </td>
        </tr>
    </table>
</form>
</body>
</html>