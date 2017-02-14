<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head lang="en">
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <title> 投注统计</title>
    <link rel="stylesheet" href="http://res.cp2y.com/h5/res/2.0/css/jcData/merge.css">

</head>
<body>
<header class="page_header">
    <div class="header_wrap">
        <h3>西甲投注统计</h3>
        <a href="/match" class="nav_left" ><i class="icon_back"></i></a>
    </div>
</header>
<section class="index_main">
    <div class="info_con" style="">
        <section class="info_betMatch info_betCon" id="tableChart">


        </section>
        <section class="info-count">
            <h2>资金曲线图</h2>
            <div class="info-count-wrap">
            <canvas id="cv" width="800" height="390"></canvas>
            </div>
        </section>

    </div>

</section>

<script>
    window.baseurl="http://res.cp2y.com/";
</script>
<script data-main="http://res.cp2y.com/h5/res/2.0/js/dev/jcData/count.js" src="http://res.cp2y.com/h5/res/2.0/js/require.min.js"></script>
</body>
</html>