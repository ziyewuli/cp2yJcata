var base=window.baseurl;
var dataUrl={
    detailUrl:"/matchDetailRecord"
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
        mid:0,
        type:1,
        init: function () {
            var that=this;
            this.mid=$.getRequest()['mid'];
            if($.getArgs('type')){
                if($.getArgs('type')<5&&$.getArgs('type')>0){
                    this.type=$.getArgs('type');
                }else{
                    this.type=1;
                    location.hash="type="+this.type;
                }

            }else{
                this.type=1;
                location.hash="type="+this.type;
            }
            that.showRegion(this.type-1);

            $('#back').click(function(){
                history.back();
            })
            $('.info_tab a').click(function(){
                var i=$('.info_tab a').index(this);
                that.showRegion(i);
            })
            var getURl=$.getRequest();
            getURl?$('.nav_left').attr('href',getURl.backUrl+'?lid='+getURl.lid+'&rid='+getURl.rid+'&type='+getURl.type):'';

        },
        showRegion:function(i){
            var that=this;
            this.type=i;
            $('.info_tab a').removeClass('on').eq(i).addClass('on');
            $('.index_main  .info_con').hide().eq(i).show();
            i? that.showData():'';
        },
        showData:function(){
            var that=this,
                mid=this.mid,
                type=this.type;
            $.ajax({
                url: dataUrl.detailUrl,
                data: {mid:mid, type: type, t: new Date().getTime()},
                success: function (data) {
                    if(data.flag==1){
                        var html=[],
                            htmllist=[],
                            html2=[],
                            html2list=[],
                            htmlsum=[],
                            html1Head=[],
                            html2Head=[],
                            Istype1first=false,
                            Istype2first=false,
                            item=data.data;
                        for(var i=0;i<item.length;i++){
                            var _item=item[i];
                            if(type==1){
                                html.push('<ul> <li>'+_item.ab+'</li> <li>'+_item.bet+'</li> <li>'+_item.be+'</li> <li>'+(new Date(_item.time)).pattern("MM-dd HH:mm")+'</li> </ul>');
                            }else if(type==2){
                                var oh=_item.oh?_item.oh:'',
                                    noh=_item.noh?_item.noh:'',
                                    od=_item.od?_item.od:'',
                                    nod=_item.nod?_item.nod:'',
                                    oa=_item.oa?_item.oa:'',
                                    noa=_item.noa?_item.noa:'';
                                html.push('<ul> <li class="line1">'+_item.companyName+'</li> <li class="font-gray">初<p>即</p></li> <li>'+oh+'<p>'+noh+'</p></li> <li>'+od+'<p>'+nod+'</p></li> <li>'+oa+'<p>'+noa+'</p></li> </ul>')
                            }else{
                                if(_item.type==0){
                                    if(!Istype1first){

                                        html.push('<div class="head"> <span class="head_name">亚洲盘·最终预测</span> <span class="head_index"> <span>信心指数</span> ');
                                        for(var j=0;j<5;j++){
                                            j<_item.confidence?html.push('<em class="on"></em> '):html.push('<em></em> ');
                                        }
                                        html.push(' </span> </div>');
                                        html1Head.push('<ul class="head_match"> <li><em><img src="http://res.cp2y.com/h5/res/2.0/images/jcdata/matchs/'+_item.upId+'.png" alt=""> </em><span class="text">'+_item.home+'</span></li> <li><span class="mark">'+_item.ycResult+'</span></li> </ul>');
                                        Istype1first=true;
                                    }else{
                                        var time=new Date(_item.createTime).getTime();
                                        htmllist.push(' <ul> <li>'+(new Date(time)).pattern("HH:mm")+'</li> <li>'+_item.home+'</li> <li>'+_item.ycResult+'</li> </ul>');
                                    }

                                }else{
                                    if(!Istype2first){
                                        html2.push(' <div class="raider_head">');
                                        html2.push('<div class="head"> <span class="head_name">竞彩胜平负·最终预测</span> <span class="head_index"> <span>信心指数</span> ');
                                        for(var j=0;j<5;j++){
                                            j<_item.confidence?html2.push('<em class="on"></em> '):html2.push('<em></em>');
                                        }
                                        html2.push(' </span> </div>');
                                        html2Head.push('<ul class="head_match"> <li><em><img src="http://res.cp2y.com/h5/res/2.0/images/jcdata/matchs/'+_item.upId+'.png" alt=""> </em><span class="text">'+_item.home+'</span></li> <li><span class="mark">'+_item.ycResult+'</span></li> </ul>');
                                        Istype2first=true;
                                    }else{
                                        var time=new Date(_item.createTime).getTime();
                                        html2list.push(' <ul> <li>'+(new Date(time)).pattern("HH:mm")+'</li> <li>'+_item.home+'</li> <li>'+_item.ycResult+'</li> </ul>');
                                    }
                                }
                            }
                        }
                        if(type==3&&item.length>0){
                            htmlsum.push('<section class="info_raiders">');
                            htmlsum.push(' <div class="raider_head">');
                            htmlsum.push(html.join(''));
                            htmlsum.push(html1Head.join(('')));
                             //   htmlsum.push('<ul class="head_match"> <li><em><img src="http://res.cp2y.com/h5/res/2.0/images/jcdata/matchs/'+_item.upId+'.png" alt=""> </em><span class="text">'+_item.home+'</span></li> <li><span class="mark">'+_item.ycResult+'</span></li> </ul>');
                            htmlsum.push('</div>');
                            htmlsum.push(' <div class="raider_list"> <div class="list_con">');
                            htmlsum.push(htmllist.join(''));
                            htmlsum.push('</div> </div>');
                            htmlsum.push(' </section>');
                            htmlsum.push('<section class="info_raiders info_jcraiders">');
                            htmlsum.push(html2.join(''));
                            htmlsum.push(html2Head.join(('')));
                           // htmlsum.push('<ul class="head_match"> <li><em><img src="http://res.cp2y.com/h5/res/2.0/images/jcdata/matchs/'+_item.upId+'.png" alt=""> </em><span class="text">'+_item.home+'</span></li> <li><span class="mark">'+_item.ycResult+'</span></li> </ul>');
                            htmlsum.push('</div>');
                            htmlsum.push(' <div class="raider_list"> <div class="list_con">');
                            htmlsum.push(html2list.join(''));
                            htmlsum.push('</div> </div>');
                            htmlsum.push(' </section>');
                        }
                        type==3? $('#info'+that.type).html(htmlsum.join('')): $('#info'+that.type).html(html.join(''));
                    }
                },error:function () {
                    d.tip("网络无法连接或不稳定，请联网后重试");
                    return false;
                }
            })
        }
    }

    jcData.init();
});