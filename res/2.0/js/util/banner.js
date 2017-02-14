
define(["extend"],function(ex){
	var banner={
		banner:null,
		init:function(o){/*banner,imgsWrap,type,isAuto,time*/  //type:circle,square
			var that=this; 
			var banner=$(o.wrapBox),
				bannerImgs=$(o.imgsWrap),
				slideTxt=$(o.slideTxt),
				prevBtn=$(o.prev),
				nextBtn=$(o.next); 
				
			this.banner=banner; 
			this.bannerImgs=bannerImgs; 
			this.slideTxt=slideTxt;
			this.time=o.time;
			this.prevBtn=prevBtn;
			this.nextBtn=nextBtn;
			nextBtn.hide();
			
			if(o.isAuto){
				var imgLen=bannerImgs.children().length;
				var imgW=$(this.banner).width(); 
				this.imgLen=imgLen;
				this.imgW=imgW;
				bannerImgs.width(imgW*imgLen);
				bannerImgs.children().width(imgW);  
				slideTxt.html("1/"+this.imgLen);
				
				this.btnSlide();
				
				this.prevBtn.on("click",function(){
					clearTimeout(that.btnTimer);
					var page=that.page;
					page++; 
					if(page<=that.imgLen){
						that.toMove();
					} 
					return; 
				});
				
				this.nextBtn.on("click",function(){  
					clearTimeout(that.btnTimer);
					var page=that.page;
					page--; 
					if(page>0){
						that.toMove();
					} 
					return; 
				}); 
				
				bannerImgs.children().on('mouseover',function(){ 
					clearTimeout(that.btnTimer); 
					return false;
				}).on('mouseout',function(){ 
					that.btnSlide();
					return false;
				}); 
			} 
		}, 
		time:6000,  
		page:1,
		btnTimer:null,
		dirMove:function(page){
			clearTimeout(this.btnTimer); 
			var that=this;
			if(page==that.imgLen){
				that.btnFlag=-1;
				$(that.nextBtn).hide();
			}else if(page==1){
				that.btnFlag=1;
				$(that.prevBtn).hide();
			}else{
				$(that.nextBtn).show();
				$(that.prevBtn).show();
			}
			
			var left=0;
			if(page<that.imgLen&&that.btnFlag==1){
				left=-this.imgW*this.page; 
				this.page++;
			}else{ 
				left=this.bannerImgs.position().left+this.imgW; 
				this.page--;
			}
			
			this.bannerImgs.animate({"left":left+"px"});  
			this.slideTxt.html(this.page+"/"+this.imgLen);
			this.btnSlide(); 
		},
		toMove:function(){
			clearTimeout(this.btnTimer); 
			var that=this,page=that.page;
			if(page==that.imgLen){
			   that.btnFlag=-1;
			} 
			
			if(page==1){
				that.btnFlag=1;
			}
			
			var left=0;
			if(page<that.imgLen&&that.btnFlag==1){
				left=-this.imgW*this.page; 
				this.page++;
				this.page==this.imgLen?$(that.nextBtn).hide():$(that.nextBtn).show();
			}else{ 
				left=this.bannerImgs.position().left+this.imgW; 
				this.page--;
				this.page==1?$(that.prevBtn).hide():$(that.prevBtn).show();
			}
			
			if(that.page==that.imgLen){ 
				$(that.prevBtn).hide(); 
				$(that.nextBtn).show();
			}else if(that.page==1){ 
				$(that.nextBtn).hide();
				$(that.prevBtn).show();
			}else{
				$(that.nextBtn).show();
				$(that.prevBtn).show();
			} 
			 
			this.bannerImgs.animate({"left":left+"px"});  
			this.slideTxt.html(this.page+"/"+this.imgLen);
			this.btnSlide(); 
			 
		}, 
		btnFlag:1,
		btnSlide:function(){
			var that=this;
			this.btnTimer=setTimeout(function(){
				that.toMove(); 
			},that.time); 
		} 
	};
	return banner;
});
