<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head lang="en">
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <title> 本轮投注记录</title>
    <link rel="stylesheet" href="http://res.cp2y.com/h5/res/2.0/css/jcData/merge.css">

</head>
<body class="bg-gray">
<header class="page_header">
    <div class="header_wrap">
        <h3>本轮投注记录</h3>
        <a href="/match" class="nav_left" ><i class="icon_back"></i></a>
    </div>
</header>
<section class="index_main">
    <div class="info_con" style="">
        <section class="info_betMatch info_betCon">
            <h2>投注内容</h2>
            <ul class="title">
                <li>投注内容</li>
                <li>投注金额</li>
                <li>投注状态</li>
                <li>比分</li>
                <li>盈利</li>
            </ul>
            <div id="info2">

            </div>
        </section>
        <section class="info-sum mt10">
            <i class="icon_count mr10"></i>盈利合计:<em id="totalMatch"></em>
        </section>
    </div>

</section>

<script>
    window.baseurl="http://res.cp2y.com/";
</script>
<script data-main="http://res.cp2y.com/h5/res/2.0/js/dev/jcData/record.js" src="http://res.cp2y.com/h5/res/2.0/js/require.min.js"></script>
</body>
</html>