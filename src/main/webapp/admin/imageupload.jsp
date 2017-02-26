<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2017/2/8
  Time: 14:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>jQuery File Upload Example</title>
</head>
<body>
<input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/static/js/jQuery-File-Upload-master/js/vendor/jquery.ui.widget.js"></script>
<script src="${pageContext.request.contextPath}/static/js/jQuery-File-Upload-master/js/jquery.iframe-transport.js"></script>
<script src="${pageContext.request.contextPath}/static/js/jQuery-File-Upload-master/js/jquery.fileupload.js"></script>
<script>
    $(function () {
        $('#fileupload').fileupload({
            dataType: 'json',
            add: function (e, data) {
                data.context = $('<button/>').text('Upload')
                    .appendTo(document.body)
                    .click(function () {
                        data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                        data.submit();
                    });
            },
            done: function (e, data) {
                data.context.text('Upload finished.');
            }
        });
    });
</script>
</body>
</html>