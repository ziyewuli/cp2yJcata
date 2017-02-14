define(["jquery"],function($){
	var share ={
		cb :'',
		init:function(){
			var currentUrl=window.location.href,
					URL=encodeURIComponent(currentUrl),
					SHARETYPE="onMenuShareTimeline,onMenuShareQQ";
			$.getScript('http://m.cp2y.com/wx/configJson?baseUrl='+URL+'&debug=0&jsApiList='+SHARETYPE+'&callback='+this.cb);

		},
		share:function(d){
		var share={
			t:'不用再跑投注站啦！',
			d:"彩票计奖器，动一动手指，3秒智能识别是否中奖、奖金多少！",
			l:currentUrl,
			i:"http://res.cp2y.com/h5/res/2.0/images/award/sharelogo.jpg"
		};
		wx.config({
			debug:false,
			appId:d.appId,
			timestamp:d.timestamp,
			nonceStr:d.nonceStr,
			signature:d.signature,
			jsApiList:['onMenuShareTimeline','onMenuShareAppMessage']
		})

		wx.ready(function(){
			wx.onMenuShareTimeline({
				title:share.t,
				link:share.l,
				imgUrl:share.i,
				success:function(res){},
				cancel:function(res){},
			});
			wx.onMenuShareAppMessage({
				title:share.t,
				desc:share.d,
				link:share.l,
				imgUrl:share.i,
				trigger:function(res){},
				success:function(res){},
				cancel:function(res){},
				fail:function(res){}
			});

		})
		wx.error(function(res){
			console.log(res);
		});
	}


};

	return share;
});

