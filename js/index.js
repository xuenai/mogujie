require(['config'],function(){
	require(['jquery','template','include'],function($,template){
		
		$('.search .top-l').hover(function(){
			$(this).find('ul').show();
		},function(){
			$(this).find('ul').hide();
		});

		$('.search .top-l li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		});

		$('.search .top .txt').focus(function(){
			$('.search .top .history').show();
		}).blur(function(){
			$('.search .top .history').hide();
		});

		$.getJSON('/data/searchHot.json',function(data){
			var searchHot={
					list:data
				};
			var html = template('search-hot',searchHot);
			$('.wrap .center .bottom').html(html);
		});

		//主题市场列表
		$.getJSON('/data/theameMark.json',function(data){
			var theame={
					list:data
				};
			var html = template('theamemark',theame);
			$('.banner .wrap ul').html(html);

			$('.banner ul li').hover(function(){
				$(this).css('background-color','white');
			},function(){
				$(this).css('background-color','');
			});
			$('.banner .wrap').on('mouseover','ul li,.show',function(){
				if($(this)[0].nodeName=="LI")
					$('.banner .wrap .show').hide().eq($(this).index()).show();
				else
					$(this).show();
			}).on('mouseout','ul li,.show',function(){
				if($(this)[0].nodeName=="LI")
					$('.banner .wrap .show').hide();
				else
					$(this).hide();
			});
		});

		//主题市场展示
		$.getJSON('/data/theameMark.json',function(data){
			console.log(data);
			var shoplist={
					list:data
				};
			var html = template('shoplist',shoplist);
			$('.banner .wrap').append(html);


			$.getJSON('/data/bantuijian.json',function(data){
				var bantuijian={
						list:data
					};
				var html = template('bantuijian',bantuijian);
				$('.banner .wrap .show .right').append(html);
			});
		});

		//banner图切换
		$.getJSON('/data/bannershow.json',function(data){
			var len=data.length,html='',pt='<div class="pt">',current=0;
			for(var i=0;i<len;i++){
				html += '<a href="#"><img src="'+ data[i].url +'" /></a>';
				pt += '<a href="#"></a>' ;
			};
			pt += '</div>';
			html += pt;
			$('.banner .bannershow').append(html);

			var as=$('.bannershow > a'),pts=$('.bannershow .pt a'),timer=null;
			timer = setInterval(go,2000);

			function go(){
				as.eq(current).fadeOut();
				pts.eq(current).css("background-color","#e7e7e7");
				current++;
				if(current >= len){
					current=0;
				}
				pts.eq(current).css("background-color","#ff0077");
				as.eq(current).fadeIn();
			}

			pts.on('mouseover',function(){
				as.eq(current).fadeOut();
				pts.eq(current).css("background-color","#e7e7e7");
				current = $(this).index();
				pts.eq(current).css("background-color","#ff0077");
				as.eq(current).fadeIn();
			});

			$('.bannershow').hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(go,2000);
			});
		});

		//倒计时
		twohours();
		function twohours(){
			var time=new Date(),h,m,s,dis,timer2=null;
			time.setHours(time.getHours()+2);
			timer2 = setInterval(function(){
				var now = new Date();
				dis = Math.floor((time - now)/1000);
				if(dis>=0){
					s = ('0'+dis%60).slice(-2);
					m = ('0'+Math.floor(dis/60)%60).slice(-2);
					h = ('0'+Math.floor(dis/60/60)).slice(-2);
					$('.time').html('<span>'+h+'</span> : <span>'+m+'</span> : <span>'+s+'</span>');
				}else{
					clearInterval(timer2);
				}
			},1000);
		}
	});
});