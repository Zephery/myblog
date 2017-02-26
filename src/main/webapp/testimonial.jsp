<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="testiactive" value="active"/>
    <jsp:param name="title" value="Testimonial"/>
</jsp:include>
<script type="text/javascript">
    jQuery(document).ready(function ($) {
        $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
        });
    });
</script>
<!--//header-->
<!--tesimonial-->
<div class="tesimonial">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="index.jsp">Home</a></li>
            <li>Testimonials</li>
        </ol>
        <h3>Testimonials</h3>
        <div class="testi-info">
            <div class="testi-left">
                <img src="images/img18.jpg" class="img-circle" alt=""/>
            </div>
            <div class="testi-right">
                <p><span>"</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span>"</span></p>
                <a href="#">Eiusmod</a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="testi-info">
            <div class="testi-left">
                <img src="images/img19.jpg" class="img-circle" alt=""/>
            </div>
            <div class="testi-right">
                <p><span>"</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span>"</span></p>
                <a href="#">Adipiscing</a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="testi-info">
            <div class="testi-left">
                <img src="images/img20.jpg" class="img-circle" alt=""/>
            </div>
            <div class="testi-right">
                <p><span>"</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span>"</span></p>
                <a href="#">Aliqua</a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="testi-info">
            <div class="testi-left">
                <img src="images/img21.jpg" class="img-circle" alt=""/>
            </div>
            <div class="testi-right">
                <p><span>"</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span>"</span></p>
                <a href="#">Consectetur</a>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<!--//tesimonial-->
<!--footer-->
<jsp:include page="foot.jsp"/>