var base=window.baseurl;
var dataUrl={
    detailUrl:"/matchData"
};
require.config({
    baseUrl:base+"h5/res/2.0/js/",
    //baseUrl:base+"2.0/js",
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

define(["extend","dialog","entry","ajaxform"],function($,d,en,f){
    //window.sitePage="p-"+pageName //如需导航显示当前页则加此设置
    d.init();
    en.init();
    // share.cb="share.share";
    //window.share=share;
    //share.init();
    jcData= {
        lid:'',
        rid:'',
        type:0,
        init: function () {
            var that=this;
            that.lid=$('#nav .nav_on').attr('data');
            var getURl=$.getRequest();
            if(getURl){
                that.lid=getURl.lid?getURl.lid:$('#nav .nav_on').attr('data');
                that.rid=getURl.rid?getURl.rid:'';
                that.type=getURl.type?getURl.type:0;
            }
            /*setTimeout(function() {
                $('#mark').hide();
            }, 3E3)*/
            that.loadShow();
            $('#nav li').click(function(){
                var i=$('#nav li').index(this),lid=$(this).attr('data');
                $('#nav li').removeClass('nav_on').eq(i).addClass('nav_on');
                that.lid=lid;
                that.rid='';
                that.dataShow()
            })
            $('#match_tab span').click(function () {
                var i=$('#match_tab span').index(this);
                $('#match_tab span').removeClass('tab_on').eq(i).addClass('tab_on');
                that.type=i==0?1:0;
                that.dataShow();
            })
            $('#tips').click(function(){
                window.location.href="http://zqdata.cp2y.com/introduce";
               // d.alert({content:'<p>足球大数据与世界著名的足球数据平台同步,提供全球200多个国家地区各级足球联赛的详细比赛数据。</p> <p>我们致力于成为帮助足球爱好者分析赛事与交流的平台。我们努力为球迷提供全方位的数据，详尽的分析以及友好的数据展现。</p> <p>比赛的实时数据，包括进球、角球、红黄牌以及进攻射门数据。</p> <p>赛前与走地的全场赔率，亚盘，角球盘口。</p> <p>有助分析的数据统计:全场半场平均角球、角球胜率以及半场结束前10分钟角球数</p>'})
            })
            $('#mark_handle').click(function(){

                /*$('#mark').toggle();*/
            })

            $('body').on('click','.list_body li',function () {
                var mid=$(this).parents('.list_one').attr('data');
                window.location.href="/matchDetail?mid="+mid+'&backUrl=/match&lid='+that.lid+'&rid='+that.rid+"&type="+that.type;
            }).on('click','.forecast',function () {
                var mid=$(this).parents('.list_one').attr('data');
                window.location.href="/matchDetail?mid="+mid+'&backUrl=/match&lid='+that.lid+'&rid='+that.rid+"&type="+that.type+"#type=4";
            })

        },
        linkTarget:function(){
            var that=this;
            $('#matchRecord').attr('href','/statistics/detail?lid='+that.lid+"&rid="+that.rid);
            $('#matchCount').attr('href','/statistics/index?lid='+that.lid+"&rid="+that.rid);
        },
        loadShow:function(){
            var that=this;
            var rid=that.rid,
                lid=that.lid,
                type=that.type;
            if(lid){
                $('#nav li').removeClass('nav_on');
                $('#nav li[data^='+lid+']').addClass('nav_on');
            }
            if(rid){
                cp2yindex.index(rid-1);
                that.rid=rid;
            }
            if(type){
                var i=type==0?1:0;
                $('#match_tab span').removeClass('tab_on').eq(i).addClass('tab_on');
            }
            that.dataShow();
        },
        dataShow:function(){
            var that=this;
            var rid=that.rid,
                lid=that.lid,
                type=that.type;
            $.ajax({
                url:dataUrl.detailUrl,
                data:{rid:rid,lid:lid,type:type,t:new Date().getTime()},
                success:function(data){
                    if(data.flag==1){
                        var right=data.right?data.right:0,
                            winMoney=data.winMoney?data.winMoney:0;
                        $('#mz').html(right+'%');
                        $('#yl').html(winMoney+'%');
                        if(that.rid!=data.rid){
                            cp2yindex.index(data.rid-1);
                            //$('#match_tab span').removeClass('tab_on').eq(1).addClass('tab_on');
                            that.rid=data.rid;
                        }
                        that.rid=data.rid;
                        //that.lid=data.lid;
                        var match=data.list,
                            html=[],
                            htmlObj={
                                'winCls':'',
                                'matchType':'走盘',
                                'winText':'-'
                            };

                        if(match.length>0){
                            for(var i=0;i<match.length;i++){
                                var _match=match[i];
                                html.push('<div class="list_one" data="'+_match.mid+'">');
                                html.push(' <ul class="list list_time"> <li>'+(new Date(_match.mtime*1000)).pattern("yyyy-MM-dd HH:mm")+'</li> </ul>');
                                html.push('<ul class="list list_body icon_up" >');
                                if(that.type==0){
                                    var ab=_match.ab?_match.ab:'';
                                    var be=_match.be?_match.be:'';
                                    html.push('<li><span class="font-block">'+_match.home+'</span><p>'+ab+'</p></li>');
                                    var showbet=_match.showbet?_match.showbet:'',
                                        hs=_match.hs!=''?_match.hs:'',
                                        as=_match.as!=''?_match.as:'';
                                    //var isEnd=(new Date()).getTime()-_match.mtime*1000>2*24*60*60*1000?true:false;
                                    if( _match.isStart==2){
                                        html.push('<li> <span class="vs font-block">'+hs+' : '+as+'</span> <p class="vs_text font-block"> '+showbet+'</p> </li>');
                                    }else{
                                        html.push('<li> <span class="vs font-block">vs</span> <p class="vs_text font-block"> '+showbet+'</p> </li>');
                                    }
                                    html.push('<li><span class="font-block">'+_match.away+'</span><p>'+be+'</p></li>');
                                    if(_match.ycStatus==0){
                                        if( _match.yresult){
                                            if(_match.isYRight==0){
                                                htmlObj={'winCls':'', 'matchType':'未中', 'winText':''+_match.ycyResult+''};
                                            }else if(_match.isYRight==1){
                                                htmlObj={'winCls':'w_win', 'matchType':'命中', 'winText':''+_match.ycyResult+''};
                                            }else if(_match.isYRight==2){
                                                htmlObj={'winCls':'w_win', 'matchType':'走盘', 'winText':''+_match.ycyResult+''};
                                            }else{
                                                htmlObj={'winCls':'w_win', 'matchType':'预测', 'winText':''+_match.ycyResult+''};
                                            }
                                        }else{
                                            htmlObj={'winCls':'w_win', 'matchType':'预测', 'winText':'待定'};
                                        }
                                    }else{
                                        htmlObj={'winCls':'', 'matchType':'预测', 'winText':'弃'};
                                    }
                                }else{
                                    var hs=_match.hs!=''?_match.hs:'',
                                        as=_match.as!=''?_match.as:'',
                                        oh=_match.oh?_match.oh:'',
                                        od=_match.od?_match.od:'',
                                        oa=_match.oa?_match.oa:'';
                                    html.push(' <li class="line1"><span class="font-block">'+_match.home+'</span></li>');
                                    //var isEnd=(new Date()).getTime()-_match.mtime*1000>2*24*60*60*1000?true:false;
                                    if( _match.isStart==2){
                                        html.push('<li> <span class="vs font-red">'+hs+' : '+as+'</span> <p class="vs_text font-block">'+oh+'  '+od+'  '+oa+'</p> </li>');
                                    }else{
                                        html.push('<li> <span class="vs font-red">vs</span> <p class="vs_text font-block">'+oh+'  '+od+'  '+oa+'</p> </li>');
                                    }
                                    html.push(' <li class="line1"><span class="font-block">'+_match.away+'</span></li>');
                                    if(_match.ycStatus==0){
                                        if( _match.oresult){
                                            if(_match.isORight==0){
                                                htmlObj={'winCls':'', 'matchType':'未中', 'winText':''+_match.ycoResult+''};
                                            }else if(_match.isYRight==1){
                                                htmlObj={'winCls':'w_win', 'matchType':'命中', 'winText':''+_match.ycoResult+''};
                                            }else{
                                                htmlObj={'winCls':'w_win', 'matchType':'预测', 'winText':''+_match.ycoResult+''};
                                            }

                                        }else{
                                            htmlObj={'winCls':'w_win', 'matchType':'预测', 'winText':'待定'};
                                        }
                                    }else{
                                        htmlObj={'winCls':'', 'matchType':'预测', 'winText':'弃'};
                                    }
                                }


                                html.push('<span class="forecast '+htmlObj.winCls+'"> <span class="f_left">'+htmlObj.matchType+'</span> <span class="f_right">'+htmlObj.winText+'</span> </span>');
                                html.push('</ul> </div>');
                            }
                        }
                        $('#conList').html(html.join(''))
                    }else{
                        $('#conList').html('');
                    }
                    that.linkTarget();
                },error:function () {
                    d.tip("网络无法连接或不稳定，请联网后重试");
                    return false;
                }
            })
        }


    }
    var cp2yindex={
        cur:0,
        size:0,
        init:function(o){
            var k=$("#scroll").children('span'),h=[],i=0;
            this.size=k.size();
            k.css({left:"100%"});
            k.eq(0).css({"left":"0"});
            $('#slide_div a.sbtn ').click(function(){
                var i= $('#slide_div a.sbtn').index(this);
                if(i==0){cp2yindex.prev();}else{cp2yindex.next();}
            })
        },
        next:function(){
            var k=$("#scroll").children('span'),sh=$("#scroll").children('em'),n,c;
            if(cp2yindex.cur==(cp2yindex.size-1)){
                // c=cp2yindex.cur;
                // cp2yindex.cur=0;
                // n=0;
            }else{
                if(jcData.lid==39&&cp2yindex.cur==35){return false}
                c=cp2yindex.cur;
                n=c+1;
                cp2yindex.cur++;
            }
            k.eq(c).css({'left':0}).stop().animate({"left":"-100%"},300);
            k.eq(n).css({'left':"100%"}).stop().animate({"left":"0"},300);
            sh.html(k.eq(n).html())
            jcData.rid=cp2yindex.cur+1;
            jcData.dataShow();
        },
        prev:function(){
            var k=$("#scroll").children('span'),sh=$("#scroll").children('em'),p,c;
            if(cp2yindex.cur==0){
                // c=0;
                //  p=cp2yindex.size-1;
                //  cp2yindex.cur=p;
            }else{
                c=cp2yindex.cur;
                p=c-1;
                cp2yindex.cur--;
            }
            k.eq(p).css({'left':'-100%'}).stop().animate({"left":0},300);
            k.eq(c).css({'left':0}).stop().animate({"left":"100%"},300);
            sh.html(k.eq(p).html())
            jcData.rid=cp2yindex.cur+1;
            jcData.dataShow();
        },
        index:function(x){
            var k=$("#scroll").children('span'),sh=$("#scroll").children('em'),n,c=cp2yindex.cur;
            if(x!=cp2yindex.cur){
                cp2yindex.cur=x;
                k.eq(c).css({'left':0}).stop().animate({"left":"-100%"},300);
                k.eq(x).css({'left':"100%"}).stop().animate({"left":"0"},300);
            }
            sh.html(k.eq(x).html())
            jcData.rid=cp2yindex.cur;
            //jcData.dataShow();
        }
    };
    jcData.init();
    cp2yindex.init();
});
