<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<jsp:include page="head.jsp">
    <jsp:param name="contactactive" value="active"/>
    <jsp:param name="title" value="Contact"/>
</jsp:include>
<!--//header-->
<div class="contact">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="index.gallerydetail.jsp">Home</a></li>
            <li>Contact Us</li>
        </ol>
        <div class="tesimonial"><h3>Contact Us</h3></div>
    </div>
    <div class="map">
        <h4>Map</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14228.54849623564!2d-80.10342101116558!3d26.930867031043434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d93335441a6f7d%3A0xdc51486fff899a21!2sJupiter%2C+FL%2C+USA!5e0!3m2!1sen!2sin!4v1433741837407"
                frameborder="0" style="border:0"></iframe>
    </div>
    <div class="container">
        <div class="contact-form">
            <div class="col-md-4 contact-form-left">
                <h4>Contact info</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div class="col-md-8 contact-form-right">
                <h4>Contact form</h4>
                <form>
                    <input type="text" value="Name" onfocus="this.value = '';"
                           onblur="if (this.value == '') {this.value = 'Name';}" required="">
                    <input type="email" value="Email" onfocus="this.value = '';"
                           onblur="if (this.value == '') {this.value = 'Email';}" required="">
                    <input type="text" value="Telephone" onfocus="this.value = '';"
                           onblur="if (this.value == '') {this.value = 'Telephone';}" required="">
                    <textarea type="text" onfocus="this.value = '';"
                              onblur="if (this.value == '') {this.value = 'Message...';}"
                              required="">Message...</textarea>
                    <input type="submit" value="Submit">
                </form>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<!--//contact-->
<!--footer-->
<div class="footer">
    <div class="container">
        <div class="col-md-4 about">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-md-4 posts">
            <h3>Popular Posts</h3>
            <div class="media">
                <div class="media-left">
                    <a href="singlepage.jsp">
                        <img class="media-object thumbnail" src="images/img11.jpg" alt="">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><a href="singlepage.jsp">Lorest Nesto</a></h4>
                    <h5>April 17, 2014</h5>
                </div>
            </div>
            <div class="media">
                <div class="media-left">
                    <a href="singlepage.jsp">
                        <img class="media-object thumbnail" src="images/img10.jpg" alt="">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><a href="singlepage.jsp">Lorest Nesto</a></h4>
                    <h5>April 17, 2014</h5>
                </div>
            </div>
            <div class="media">
                <div class="media-left">
                    <a href="singlepage.jsp">
                        <img class="media-object thumbnail" src="images/img11.jpg" alt="">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><a href="singlepage.jsp">Lorest Nesto</a></h4>
                    <h5>April 17, 2014</h5>
                </div>
            </div>
        </div>
        <div class="col-md-4 address">
            <h3>Our address</h3>
            <p>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam
                processus dynamicus,
                luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta </p>
            <ul>
                <li><span></span>Moonshine St. 14/05 Light, Jupiter</li>
                <li><span class="ph-no"></span>+00 (123) 456 78 90</li>
                <li><span class="mail"></span><a href="mailto:example@mail.com">mail@example.com</a></li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<div class="copy-right">
    <div class="container">
        <p>Copyright &copy; 2015.Company name All rights reserved.<a target="_blank" href="http://sc.chinaz.com/moban/">
            &#x7F51;&#x9875;&#x6A21;&#x677F;</a></p>
    </div>
</div>
<!--//footer-->
<jsp:include page="foot.jsp"/>