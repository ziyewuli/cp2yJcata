var base=window.baseurl;
var dataUrl={
    detailUrl:"/statistics/ridData"
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
            $('#info2').on('click', '.list', function(){
                if($(this).hasClass('up')){
                    $('#info2 .list').removeClass('up');
                    $(this).removeClass('up');
                }else{
                    $('#info2 .list').removeClass('up');
                    $(this).addClass('up');
                }

            })

        },
        getData:function(rid,lid) {
            var that=this,html=[],chartData=[];
            $.ajax({
                url: dataUrl.detailUrl,
                data: {rid: rid, lid: lid,t: new Date().getTime()},
                success: function (data) {
                    if (data.flag == 1) {
                        var detailData=data.data,tatalMoney=0,
                            tatalArr=[];
                        for(var i=0; i<detailData.length;i++){
                            var betMatch=detailData[i].detail=="上"?detailData[i].home:detailData[i].away,
                                status=['未投注','已投注','比赛中','已结算','放弃'],
                                matchResult=detailData[i].outputAmount-detailData[i].investmentAmount,
                                matchResult=detailData[i].status<3||detailData[i].result==-1?0:matchResult,
                                investmentAmount=detailData[i].status==0?'-':detailData[i].investmentAmount;
                            tatalMoney+=matchResult;
                            html.push('<div class="list">')
                            html.push(' <ul class="con" > <li>'+betMatch+'</li> <li>'+investmentAmount+'</li> <li>'+status[detailData[i].status]+'</li> <li>'+detailData[i].as+':'+detailData[i].hs+'</li> <li>'+matchResult+'</li> </ul>')
                            html.push('<div class="details"> <ul> <li>'+(new Date(detailData[i].mtime)).pattern("MM-dd  HH:mm")+'</li> <li>'+detailData[i].home+'vs'+detailData[i].away+'</li> <li>'+detailData[i].ab+'&nbsp;&nbsp;'+  detailData[i].bet+'&nbsp;&nbsp;'+ detailData[i].be +'</li> </ul></div>');
                            html.push('</div>');

                        }
                        tatalMoney=tatalMoney>0?"+"+tatalMoney:tatalMoney;
                        $('#info2').html(html.join(''));
                        $('#totalMatch').html(tatalMoney); 
                    }
                }
            })
        }

    }

    jcData.init();
});