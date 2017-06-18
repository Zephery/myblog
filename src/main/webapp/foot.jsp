<%--
  Created by IntelliJ IDEA.
  User: Zephery
  Date: 2016/8/5
  Time: 17:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<script>
    $(document).ready(function () {
            var str = new Date().getFullYear();
            console.log(str);
            var datetime = '<p>Copyright &copy; 2016-' + str + '.Zephery Wen本人所有哟.</p>';
            $(".copy-right .container").html(datetime);
        }
    );
</script>
<div class="copy-right">
    <div class="container">
        <footer class="footer">
            <div class="footer-inner">
                <div class="copyright pull-left">
                    <a href="http://cuiqingcai.com/" title="静觅">静觅</a> 版权所有丨采用<a href="http://yusi123.com/"> 欲思 </a>主题丨基于<a
                        href="http://cn.wordpress.org/" title="WordPress"> WordPress </a>构建 © 2015丨托管于 <a rel="nofollow"
                                                                                                          target="_blank"
                                                                                                          href="http://www.aliyun.com/">阿里云主机</a>
                    &amp; <a rel="nofollow" target="_blank" href="http://www.qiniu.com/">七牛云存储 </a>丨鲁ICP备14030596号
                    <div>

                <span id="cnzz_stat_icon_1253486800"><a href="http://www.cnzz.com/stat/website.php?web_id=1253486800"
                                                        target="_blank">站长统计</a><a
                        href="http://www.cnzz.com/stat/website.php?web_id=1253486800" target="_blank"> |  今日IP[801] | 今日PV[2178] | 昨日IP[3004] |  昨日PV[9416] | </a><a
                        href="http://www.cnzz.com/stat/website.php?web_id=1253486800&amp;method=online" target="_blank">当前在线[23]</a></span>
                        <script src="jingmi/z_stat.php" type="text/javascript"></script>
                        <script src="jingmi/core.php" charset="utf-8" type="text/javascript"></script>
                    </div>
                </div>

            </div>
        </footer>

    </div>
</div>
<!--smooth-scrolling-of-move-up-->
<script type="text/javascript">
    $(document).ready(function () {
        /*
         var defaults = {
         containerID: 'toTop', // fading element id
         containerHoverID: 'toTopHover', // fading element hover id
         scrollSpeed: 1200,
         easingType: 'linear'
         };
         */

        $().UItoTop({easingType: 'easeOutQuart'});

    });
</script>
<a href="#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>
<!--//smooth-scrolling-of-move-up-->
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/bootstrap.js"></script>