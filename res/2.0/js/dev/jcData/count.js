var base=window.baseurl;
var dataUrl={
    detailUrl:"/statistics/lidData"
};
require.config({
    baseUrl:base+"h5/res/2.0/js/",
    //baseUrl:base+"res/2.0/js/",
    paths:{
        "jquery" : ["jquery-2.0.3.min"],
        "extend" : "dev/common/extend",
        "dialog" : "dev/common/dialog",
        "entry" : "dev/common/entry",
        //  "share" : "dev/common/share",
        "util"   : "dev/common/util",
        "ajaxform"  : "util/ajaxform"
    },
    urlArgs:"v=20160422"
});

define(["extend","dialog","entry"],function($,d,en,f){
    //window.sitePage="p-"+pageName //如需导航显示当前页则加此设置
    d.init();
    en.init();
    // share.cb="share.share";
    //window.share=share;
    //share.init();
    jcData= {
        mid:0,
        type:1,
        init: function () {
            var that=this;
            var getRequest=$.getRequest();
            if(getRequest.lid&&getRequest.rid){
                that.getData(getRequest.rid,getRequest.lid);
            }else{
                d.alert({content:'轮次与场次不正确，请返回首页选择轮次与场次再进入',link:'http://zqdata.cp2y.com/match'})
            }

        },
        draw:function(data){
            var dict =data;

            //数据源提取
            var len = dict.length,
                w=$(window).width(),//页面宽度
                devideW=45;
            var xArr = [], yArr = [], tmp_yArr = [];
            if(w/len>45){
                devideW=Math.floor(w/len-10);
            }
            for(var i=0; i<len; i++){
                xArr.push(i * devideW);
                tmp_yArr.push(dict[i].y);
            }
            var tmp_minY = Math.min.apply(Math, tmp_yArr);//最小值
            var tmp_maxY = Math.max.apply(Math, tmp_yArr);//最大值
            if(tmp_maxY - tmp_minY <20000){
                for(var i=0; i<len; i++){
                    var tep_y=tmp_yArr[i]/20000*340-50;
                    if(tep_y<50){
                        yArr.push(50);
                    }else if(tep_y>340){
                        yArr.push(340);
                    }else{
                        yArr.push(tep_y);//与最小的做比较
                    }

                }
            }
            else{//如果相差太大会导致图表不美观
                for(var i=0; i<len; i++){
                    yArr.push(tmp_yArr[i] /(tmp_maxY-tmp_minY) *340);
                }
            }

            var minY = Math.min.apply(Math, yArr);
            var maxY = Math.max.apply(Math, yArr);

            //canvas 准备
            var canvas = document.getElementById("cv");//获取canvas画布
            canvas.width=len*devideW+20;
            var ctx  = canvas.getContext("2d"),
                height=canvas.height,
                width=canvas.clientWidth;

            function drawBorder(){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#E8E8E8";
                ctx.moveTo(20 ,height-20);
                ctx.lineTo(width,height-20);
                ctx .stroke();
                ctx.closePath();

            }
            function drawBackground(){//画背景
                for(var i=0 ;i<len; i++){
                    ctx.beginPath();
                    ctx.moveTo(i*devideW+20,0)
                    ctx.lineTo(i*devideW+20,height-20);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#E8E8E8";
                    ctx .stroke();
                    ctx.closePath();
                }


            }
            //画折线
            function drawBlockLine(){
                ctx.beginPath();
                for(var i=0 ;i<len; i++){
                    var x = xArr[i]+20;
                    var y = maxY - yArr[i] + minY;
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#a6a6a6";
                    if(i === 0){
                        ctx .moveTo(x, y);
                    }
                    else{
                        ctx .lineTo(x, y);

                    }

                }
                ctx .stroke();
                // ctx .stroke();
            }

            function drawBlockcyCycle(){
                //画点
                for(var i=0; i<len; i++){
                    var x = xArr[i]+20;
                    var y = maxY - yArr[i] + minY;
                    var xMemo = dict[i].x;
                    var yMemo = dict[i].y+'元';
                    ctx.beginPath();
                    ctx.fillStyle = "#ff690c";
                    ctx.arc(x, y, 5, 0, 2*Math.PI);//画点
                    ctx.fill();
                    ctx.fillStyle = "#4a4a4a";
                    //ctx.font="14px Arial";
                    ctx.fillText(yMemo, x - 15, y - 10);
                    ctx.fillText(xMemo, x -15, canvas.height-5, 40);//画文字
                }
            }

            drawBorder();
            drawBackground();
            drawBlockLine();
            drawBlockcyCycle();
        },
        getData:function(rid,lid) {
            var that=this,html=[],chartData=[];
            $.ajax({
                url: dataUrl.detailUrl,
                data: {rid: rid, lid: lid,t: new Date().getTime()},
                success: function (data) {
                    if (data.flag == 1) {
                        var detailData=data.data;
                        html.push('<h2>联赛结算总表</h2>');
                        html.push('<ul class="title"> <li>轮次</li> <li>下注场次</li> <li>命中场次</li> <li>胜率</li> <li>盈利率</li> </ul>');

                        for(var i=0; i<detailData.length;i++){
                            chartData.push({x:'第'+detailData[i].rid+'轮',y:detailData[i].endAmount});
                            html.push(' <ul> <li>'+detailData[i].rid+'</li> <li>'+detailData[i].lid+'</li> <li>'+detailData[i].win+'</li> <li>'+detailData[i].hitRate*100+'%</li> <li>'+detailData[i].earningsRate+'%</li> </ul>');
                        }
                        $('#tableChart').html(html.join(''));
                       // return chartData;
                        console.log(chartData);
                        var dict = [
                            {x: "第1轮", y: 10297.5},
                            {x: "第2轮", y: 9000},
                            {x: "第3轮", y: 18000},
                            {x: "第4轮", y: 5000},
                            {x: "第5轮", y: 13380},
                            {x: "第6轮", y: 16000},
                            {x: "第7轮", y: 13400},
                            {x: "第8轮", y: 14000},
                            {x: "第9轮", y: 13370},
                            {x: "第10轮", y: 10000},
                            {x: "第11轮", y: 13400},
                            {x: "第12轮", y: 13380},
                            {x: "第13轮", y: 8500},
                            {x: "第14轮", y: 13370},
                            {x: "第15轮", y: 13380},
                            {x: "第16轮", y: 6400},
                            {x: "第17轮", y: 13380},
                            {x: "第18轮", y: 13370},
                            {x: "第19轮", y: 24000},
                            {x: "第20轮", y: 13380},
                            {x: "第21轮", y: 20000},
                            {x: "第22轮", y: 13380},
                            {x: "第23轮", y: 13370},
                            {x: "第24轮", y: 8000},
                            {x: "第25轮", y: 13380},
                            {x: "第26轮", y: 13400},
                            {x: "第27轮", y: 6000},
                            {x: "第28轮", y: 13370},
                            {x: "第29轮", y: 4500},
                            {x: "第30轮", y: 7000},
                            {x: "第31轮", y: 26000},
                            {x: "第32轮", y: 13380},
                            {x: "第33轮", y: 13370},
                            {x: "第34轮", y: 13370},
                            {x: "第35轮", y: 13380},
                            {x: "第36轮", y: 13400},
                            {x: "第37轮", y: 2000},
                            {x: "第38轮", y: 13370}
                        ]
                        that.draw(chartData);
                        return false;
                    }
                }
            })
        }

    }

    jcData.init();
});