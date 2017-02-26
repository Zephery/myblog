<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <title>Test</title>
    <link rel="stylesheet" type="text/css" href="static/mdeditor/css/editormd.css">
    <script src="js/jquery.min.js"></script>
    <script type="text/javascript" src="static/mdeditor/editormd.min.js"></script>
    <script>
        $(function () {
            editormd("test-editormd", {
                width: "90%",
                height: 640,
                syncScrolling: "single",
                //你的lib目录的路径，
                path: "static/mdeditor/lib/",
                //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
                saveHTMLToTextarea: true,
                imageUpload: true,
                imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL: "/upload/image"
            });
            editor.setTheme('monokai');
        });
    </script>
</head>
<body>
<form action="admin/saveblog.do">
    <div class="editormd" id="test-editormd">
        <textarea class="editormd-markdown-textarea" name="content"></textarea>
        <!-- 第二个隐藏文本域，用来构造生成的HTML代码，方便表单POST提交，这里的name可以任意取，后台接受时以这个name键为准 -->
        <textarea class="editormd-html-textarea" name="summary"></textarea>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
</body>
</html>