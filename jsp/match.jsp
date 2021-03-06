<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head lang="en">
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <title> 竞彩预测</title>
    <link rel="stylesheet" href="http://ceres.cp2y.com:5555/h5/res/2.0/css/jcData/merge.css">
</head>
<body>
<body>
<header class="page_header">
    <div class="header_wrap">
        <h3>大数据</h3>
        <a href="match" class="nav_left"><i class="icon_back"></i></a>
        <a class="nav_right" id="tips"><i class="icon_tips"></i></a>
    </div>
</header>
<section class="index_main">
    <nav class="nav_box">
        <ul class="nav_ul" id="nav">
            <li class="nav_on" data="92">
                <em><img src="http://ceres.cp2y.com:5555/h5/res/2.0/images/jcdata/logo-yc.png" alt=""> </em>
                <span>英超</span>
                <i></i>
            </li>
            <li data="85">
                <em><img src="http://ceres.cp2y.com:5555/h5/res/2.0/images/jcdata/logo-xj.png" alt=""> </em>
                <span>西甲</span>
                <i></i>
            </li>
            <li data="34">
                <em><img src="http://ceres.cp2y.com:5555/h5/res/2.0/images/jcdata/logo-yj.png" alt=""> </em>
                <span>意甲</span>
                <i></i>
            </li>
            <li data="39">
                <em><img src="http://ceres.cp2y.com:5555/h5/res/2.0/images/jcdata/logo-dj.png" alt=""> </em>
                <span>德甲</span>
                <i></i>
            </li>
        </ul>
    </nav>
    <div class="carousel" id="slide_div">
        <a class="sbtn prev" ></a>
        <a class="sbtn next"></a>
        <div class="carousel_list" id="scroll">
            <em></em>
			<span v="1">第1轮</span>
            <span>第2轮</span>
            <span>第3轮</span>
            <span>第4轮</span>
            <span>第5轮</span>
            <span>第6轮</span>
            <span>第7轮</span>
            <span>第8轮</span>
            <span>第9轮</span>
            <span>第10轮</span>
            <span>第11轮</span>
            <span>第12轮</span>
            <span>第13轮</span>
            <span>第14轮</span>
            <span>第15轮</span>
            <span>第16轮</span>
            <span>第17轮</span>
            <span>第18轮</span>
            <span>第19轮</span>
            <span>第20轮</span>
            <span>第21轮</span>
            <span>第22轮</span>
            <span>第23轮</span>
            <span>第24轮</span>
            <span>第25轮</span>
            <span>第26轮</span>
            <span>第27轮</span>
            <span>第28轮</span>
            <span>第29轮</span>
            <span>第30轮</span>
            <span>第31轮</span>
            <span>第32轮</span>
            <span>第33轮</span>
            <span>第34轮</span>
            <span>第35轮</span>
            <span>第36轮</span>
            <span>第37轮</span>
            <span>第38轮</span>
        </div>
    </div>
    <div class="data_main">
        <div class="data_tab">
            <div class="tab" id="match_tab">
                <span >竞彩</span>
                <span class="tab_on">亚盘</span>
            </div>
            <em class="icon_sum" id="mark_handle"></em>
            <ul class="match_win" id="mark">
                <li><span>命中率</span><em id="mz">67%</em></li>
                <li><span>盈利率</span><em id="yl">73%</em></li>
            </ul>
        </div>
        <div class="data_con">
            <div class="con_list">
                <ul class="list list_head">
                    <li>主队</li>
                    <li>指数</li>
                    <li>客队</li>
                    <span>预测</span>
                </ul>
                <div id="conList"></div>                
            </div>
        </div>
    </div>
</section>
<footer class="page-footer">
<div class="footer_wrap">
<a href="/statistics/detail" title="" id="matchRecord"><i class="icon_cord"></i>本轮投注记录</a>
<a href="/statistics/index" title="" id="matchCount"><i class="icon_line"></i>联赛投注统计</a>
</div>
</footer>
<div class="cp2yDialogBox">
    <div class="dialogTitle">功能说明</div>
    <div class="dialogContent">
        <div class="Alert"><p>足球大数据与世界著名的足球数据平台同步,提供全球200多个国家地区各级足球联赛的详细比赛数据。</p>
            <p>我们致力于成为帮助足球爱好者分析赛事与交流的平台。我们努力为球迷提供全方位的数据，详尽的分析以及友好的数据展现。</p>
<p>比赛的实时数据，包括进球、角球、红黄牌以及进攻射门数据。</p>
<p>赛前与走地的全场赔率，亚盘，角球盘口。</p>
<p>有助分析的数据统计:全场半场平均角球、角球胜率以及半场结束前10分钟角球数</p></div>
        <div class="Btns"><a id="frameBtn0" class="closeDialog" data="0">确定</a></div>
    </div>
</div>
<script>
    window.baseurl="http://ceres.cp2y.com:5555/";
</script>
<script data-main="http://ceres.cp2y.com:5555/h5/res/2.0/js/dev/jcData/index.js" src="http://ceres.cp2y.com:5555/h5/res/2.0/js/require.min.js"></script>
</body>
</html>