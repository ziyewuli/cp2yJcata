define(['jquery','util'],function($,u){
  var d={
    init:function(){
      $('body').on('click','.closeDialog',function(){ 
        var i=$(this).attr('data');
        d.close(i);
        if(d._flag){d._flag=false;}
      }).on('mousedown','.dialogTitle',function(event){
        var dragObj=$(this).parent(),pos={top:dragObj.position().top,left:dragObj.position().left},oh=dragObj.outerHeight(),ow=dragObj.outerWidth();
        pos={top:event.clientY-pos.top,left:event.clientX-pos.left};
        $(this).mousemove(function(event){
          try{if(window.getSelection){window.getSelection().removeAllRanges();}else{document.selection.empty();}}catch(e){}
          var s=u.screen(),maxTop=s.sh,maxLeft=s.sw,top = Math.max(event.clientY-pos.top,0),left=Math.max(event.clientX-pos.left,0);
          dragObj.css({top:Math.min(top,maxTop-oh),left:Math.min(left,maxLeft-ow)});
        }).mouseup(function(){
          $(this).off('mousemove');$(this).off('mouseup');
        });
      });
    },
  	_set:function(_obj,i){
      var t=document.documentElement.scrollTop || document.body.scrollTop,
        //viewHeight=$(window).height(),
		viewHeight=document.body.clientHeight,
        viewWidth=$(window).width(),
        _objHeight=_obj.height(),
        _objWidth=_obj.width(),
        dialogLeft = (viewWidth / 2) - (_objWidth / 2)-7,
		dialogTop=_objHeight>=viewHeight?t:(viewHeight / 2) - (_objHeight / 2) + t;
		//dialogTop=(viewHeight / 2) - (_objHeight / 2) + t;
		 
		
      _obj.css({top:dialogTop,left:dialogLeft});
      $("#cp2yLock"+i).css({"width": u.screen().sw,"height": u.screen().sh}).show();

  	},
    _flag:false,
    alertMask:function(){
      if(this._flag){return false;}
      var i=$(".cp2yLock").size();//中间有关闭 i不唯一 加一个 index 来记录
      window.dialogLock=true;
      this._lock(i);
    },
    tip:function(msg){
      var tipHtml;
      if (tipHtml != undefined) {
        return;
      }
      tipHtml = '<div class="db-tip-wrap"><div class="db-tip">' + msg + '</div></div>';
      var $html = $(tipHtml);
      $('body').append($html);
      setTimeout(function () {
        $html.remove();
        tipHtml = undefined;
      }, 2000);
    },
    back:function(){
      
    },
  	alert:function(o){
      if(this._flag){return false;}
      var i=$(".cp2yLock").size();//中间有关闭 i不唯一 加一个 index 来记录
      window.dialogLock=true;
      this._lock(i);
      if(!o.type){o.type='warn';}
      var k={
        t:'提示信息',
        c:''//class="Alert"
      },c='<div class="alertCon"><span class="'+ o.type+'">'+ o.content+'</span></div><div class="Btns">';
      if(o.link){
        c+='<a href="'+o.link+'" id="frameBtn'+i+'" target="_blank" class="closeDialog btn1" data='+i+'>确定</a></div>';
      }else{
        c+='<a id="frameBtn'+i+'" class="closeDialog btn1" data='+i+'>确定</a></div>';// dlgBtn'+i+'
      }
      k.c=c;
      if(o.okFn){
        k.okFn= o.okFn;
      }
	  
      //this._open(k,i,o.css,o.cName);
	  this._open(k,i,o.css,"AlertDlg");
  	},
    open:function(o,css,cName){
      var i=$(".cp2yLock").size();
      window.dialogLock=true;
      this._lock(i);
      this._open(o,i,css,cName);
    },
    frame:function(o){
      var i=$(".cp2yLock").size();
      window.dialogLock=true;
      this._lock(i);
      var css={width:"584px",height:"391px"},x;
      if(o.css){
        css.width=o.css.width;
        css.height=(o.css.height+92);
      }
      x={
        t: o.title,
        c:'<div style="height:'+(css.height-92)+'px"><iframe src="../../../js/'+o.url+'" class="iframe" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe></div>'
      }
      if(!o.btns){
        x.c+='<div class="Btns">';
        if(o.ok){
          x.c+='<a id="frameBtn'+i+'" class="closeDialog btn1" data='+i+'>'+ o.ok+'</a>';
          x.okFn= o.okFn;
        }
        if(o.cancel){
          x.c+='<a class="closeDialog btn1" data='+i+'>'+ o.cancel+'</a>';
        }
        x.c+='</div>';
      }
      this._open(x,i,css,false);
    },
    close:function(i){
	  if(isNaN(i)){
	  	i=$("."+i).attr("data");
	  }
      $("#cp2yLock"+i).remove();
      $("#cp2yDialogBox"+i).remove();
      if($(".cp2yLock").size()==0){
        window.dialogLock=false;
      }
      $('body').removeClass('ovfHiden');
    },
    _lock:function(i){
      $('body').append('<div class="cp2yLock" id="cp2yLock'+i+'"></div>');
    },
    _open:function(o,i,css,cName){
  		var that=this,d=[]; 
      d.push('<div class="dialogTitle"><i class="l"></i><span>'+o.t+'</span><a class="closeDialog" data="'+i+'"></a><i class="r"></i></div>');
      d.push('<div class="dialogContent">'+o.c+'</div>');
      $('body').append('<div class="cp2yDialogBox" data="'+i+'" id="cp2yDialogBox'+i+'"></div>');
      var ob=$("#cp2yDialogBox"+i);
      if(cName){
        ob.addClass(cName);
      }
      if(css){
        ob.css(css);
      }
      ob.html(d.join('')).show();
	  var obH=ob.height(),conObj=ob.children(".dialogContent");//11x5add
      $('body').addClass('ovfHiden');
	  //conObj.height(obH-80+"px");//80:titH:40 padding:20px;
	  
      if(o.okFn){
        $('#frameBtn'+i).off().on('click',function(){
          o.okFn();
        });
      }
      u.throttle(this._set(ob,i), 50, 100);
  		$(window).resize(function(){
        if(window.dialogLock){
          u.throttle(that._set(ob,i), 50, 100);
        }
      });
  	}
  };
  return d;
});
