<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2016/8/23
  Time: 19:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>写博客页面</title>
    <link href="${pageContext.request.contextPath}/css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
    <link href="${pageContext.request.contextPath}/css/style.css" type="text/css" rel="stylesheet" media="all">
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/wangeditor/dist/js/lib/zepto.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/wangeditor/dist/js/lib/zepto.touch.js"></script>

    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/static/wangeditor/dist/css/wangEditor-mobile.css">

    <script type="text/javascript"
            src="${pageContext.request.contextPath}/static/wangeditor/dist/js/wangEditor-mobile.js"></script>
    <style type="text/css">
        .container {
            width: 100%;
            height: 300px;
            border: 1px solid #ccc;
        }
    </style>


    <script type="text/javascript">

        function submitData() {
            var talkid = new Date().getTime().toString().substring(5,13);
            var content = $("#textarea1").val();
            if (content == null || content == '') {
                alert("请输入内容fefwfaw！");
            } else {
                $.post("${pageContext.request.contextPath}/admin/savetalk.do", {
                    'talkid': parseInt(talkid),
                    'content': content
                }, function (result) {
                    if (result.success) {
                        alert("博客发布成功！");
                        resetValue();
                    } else {
                        alert("博客发布失败！");
                    }
                }, "json");
            }
        }
    </script>


</head>
<body>
<center><h1 style="">Message</h1></center>
<br>


<%--<form action="${pageContext.request.contextPath}/admin/savetalk.do">--%>
<table style="width: 90%;margin: auto">
    <%--<tr>--%>
        <%--<td>--%>
            <%--<input type="text" id="talkid" name="talkid"/>--%>
        <%--</td>--%>
    <%--</tr>--%>
    <tr>
        <td>
            <div class="container"><textarea id="textarea1" name="content"
                                             style="width:100%;height:100%;"></textarea></div>
        </td>

    </tr>
    <tr>
        <td>
            <a href="javascript:submitData()" style="margin: 0 50% 0 40%" class="btn btn-primary"
               data-options="iconCls:'icon-submit'">发布</a>
        </td>
    </tr>
</table>


<script type="text/javascript">
    $(function () {
        // ___E 三个下划线
        var editor = new ___E('textarea1');
        editor.init();
    });
</script>
</body>
</html>