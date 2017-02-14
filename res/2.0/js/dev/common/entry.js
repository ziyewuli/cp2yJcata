define(["extend","dialog"],function($,d){
	var base=window.baseurl;
	var WebAppUrl = { 
		//SSO_ExistName:base+"user/existuser.do",//检查用户名
		//SSO_FastIn   : base+'user/register.do' ,//注册请求
		//SSO_Login    : base+'user/login.do',//登陆
		HOME_SignOut   : '/user/exit',//退出登陆
		HOME_CheckLogin   : '/user/checkLogin',//是否登录
	    HOME_URL:'/oneyuan/index'//首页

	};
	
	var wait=60;
	var entry={
		isIn:false,
		signWay:0,
		init:function(){
			var that = this;
			//that.checkLogin();
			/*h5*/
			$("body").on("click","#signout",function(){
				var a=confirm("您确定要退出当前账号吗？");
				if(a==true){
					that.signOut($(this));
				}
			})

		},
		checkLogin:function(){//是否登录  url:参数  type:0 是否登录  1:登录后回调函数
			  var that= this,html=[];  
			  $.ajax({
			      url:WebAppUrl.HOME_CheckLogin,
				  data:{t:new Date().getTime()}, 
				  success: function(result){ //eval(result);//回调函数  参数后台来 
					    var isIn=false,name=$.cookie.get("sjj_username");
					    if(result.flag==1){ isIn=true; } 
					    //that.signIn(isIn,name);
				  }
			  });  
		},
		login0penUrl:function(url) {//登录->回调函数
			   var that= this;
				$.ajax({ 
					url:WebAppUrl.HOME_CheckLogin1, 
					data:{booleanValue:true,t:new Date().getTime()},
					success: function(result) { 
						var openUrl = url.indexOf("?")==-1?url+"?t="+new Date().getTime():url+"&t="+new Date().getTime();
						//openUrl = WebAppUrl.HOME_URL+openUrl;
						openUrl = 'http://www.cp2y.com'+openUrl;
						if (result!='false') {//登录直接跳转 
							  window.location = openUrl;
						} else {//未登录 登录后跳转
							that._lgCallBack = function(){ window.location = openUrl; };
							that.show();
						}
					}
				});
		  },
		  login:function(namev,pwdv,codev,di){//登入  nameObj,pwdObj,codeObj  
		         var that = this;  
				 $.ajax({
					url     : WebAppUrl.SSO_Login,
					data    : {name:namev,passWord:pwdv,t:new Date().getTime()}, 
					cache   : false, 
					success : function(result){ 
						if(!result.flag){
							$('#warn').html("<em></em>"+result.errorMsg);
						}else{
							d.close(di);
							that.isIn = true; 
							that.errorTimes=0; 
							that.signIn(true,result.obj.name,result.obj.id); 
						    that._lgCallBack&&that._lgCallBack();//登录后回调函数 
						}
					},
					error   : function(r){
						d.tip('请检查网络是否畅通。如果确认网络是通的，请联系客服人员帮助解决。');
					}
				}); 
		  },
		  signIn:function(isIn,name,id){
			  var that=this,html=[];
			  this.isIn=isIn;
			  if(isIn){  
				 html.push('<a class="user-icon-lt" id="personalCenter"></a><span id="hd-userName" class="hd-user">'+that.autoAddEllipsis(name,10)+'</span><span style="display: none;" id="hd-quit" class="hd-user"><a class="link-btn" id="signout">退出</a></span>');
				  $("#enter").html(html.join(''));			  
			  }else{ 
				  html.push('<i class="line"></i><a id="hd-login" class="link-btn toIn">登录</a><a id="hd-register" target="_blank" href="'+WebAppUrl.HOME_URL+'user/sso.do" class="toIn">注册</a>'); 
				  $("#enter").html(html.join(''));
			  } 
		  },
		  signOut:function(){
			    var that = this,productId=$('#productId').val();
				this.isIn=false;
				$.ajax({ 
					url     :WebAppUrl.HOME_SignOut,
					data    :{ajax:true,t:new Date().getTime()},
					cache   : false,
					success : function(result){
						if(result.flag==1){
							window.location = WebAppUrl.HOME_URL+'?productId='+productId;
							//that.signIn(false,"");
						}
					}.bind(this),
					error   : function(result){
						d.tip('请检查网络是否畅通。如果确认网络是通的，请联系客服人员帮助解决。');
					}
				});
			 
		  }

	};
	return entry;
});