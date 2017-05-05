<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>写博客页面</title>
    <link type="image/x-icon" rel="shortcut icon" href="${pageContext.request.contextPath}/images/66.jpg"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/mdeditor/css/editormd.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/mdeditor/editormd.js"></script>
    <script type="text/javascript">
        $(function () {
            editormd("test-editormd", {
                width: "90%",
                height: 640,
                syncScrolling: "single",
                //你的lib目录的路径，
                path: "${pageContext.request.contextPath}/static/mdeditor/lib/",
                //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
                saveHTMLToTextarea: true,
                imageUpload: true,
                imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL: "${pageContext.request.contextPath}/admin/uploadfile.do"
            });
        });
        function submitData() {
            alert("正在发布，请稍等");
            var title = $("#title").val();
            var categoryid = $("#categoryid").val();
            var content = $(".editormd-preview").html();
            var mdcontent=$(".editormd-markdown-textarea").val();
            console.log(content);
            if (title == null || title == '') {
                alert("请输入标题！");
            } else if (categoryid == null || categoryid == '') {
                alert("请选择博客类别！");
            } else if (content == null || content == '') {
                alert("请输入内容！");
            } else {
                $.post("${pageContext.request.contextPath}/admin/saveblog.do", {
                    'title': title,
                    'categoryid': categoryid,
                    'htmlcontent': content,
                    'mdcontent':mdcontent
                }, function (result) {
                    if (result.success) {
                        alert("博客发布成功！");
                        window.location.href = "${pageContext.request.contextPath}/blog.html?pagenum=1";
                    } else {
                        alert("博客发布失败！");
                    }
                }, "json");
            }
        }
//        $(function () {
//            var text = $(".editormd-preview").prop("outerHTML");
//            console.log(text);
//            $("#htmlcontent").attr("value", text);
//        })
    </script>
</head>
<body>
<form method="post">
    <table cellspacing="20px">
        <tr>
            <td width="80px">博客标题：</td>
            <td><label><input type="text" id="title" name="title" style=""/></label></td>
            <td>所属类别：</td>
            <td>
                <select class="easyui-combobox" id="categoryid" name="categoryid"
                        editable="false"
                        panelHeight="auto">
                    <option value="">请选择博客类别...</option>
                    <c:forEach var="category" items="${categories}">
                        <option value="${category.categoryid}">${category.categoryname}</option>
                    </c:forEach>
                </select>
            </td>
            <td></td>
            <td>
                <div>
                    <input type="button" onclick="submitData()" value="Submit"/>
                </div>
            </td>
        </tr>
    </table>
    <div class="editormd" id="test-editormd">
        <textarea class="editormd-markdown-textarea" name="mdcontent"></textarea>
        <!-- 第二个隐藏文本域，用来构造生成的HTML代码，方便表单POST提交，这里的name可以任意取，后台接受时以这个name键为准 -->
        <textarea class="editormd-html-textarea" name="htcontent"></textarea>
        <textarea hidden="true" id="htmlcontent" name="htmlcontent"></textarea>
    </div>
</form>
</body>
</html>