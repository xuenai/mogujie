require(['config'],function(){
	require(['jquery','template','tweenmax','include'],function($,template){
		//搜索栏部分
		$('.search .top-l,.bar .top-l').hover(function(){
			$(this).find('ul').show();
		},function(){
			$(this).find('ul').hide();
		});

		$('.search .top-l li,.bar .top-l li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		});

		$('.search .top .txt').focus(function(){
			$('.search .top .history').show();
		}).blur(function(){
			$('.search .top .history').hide();
		});

		$('.bar .top .txt').focus(function(){
			$('.bar .top .history').show();
		}).blur(function(){
			$('.bar .top .history').hide();
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
			$('.banner .wrap ul,.shop ul').html(html);

			$('.banner ul li,.shop ul li').hover(function(){
				$(this).css('background-color','white');
			},function(){
				$(this).css('background-color','');
			});

			//1
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
			//2
			$('.shop').on('mouseover','ul li,.show',function(){
				if($(this)[0].nodeName=="LI")
					$('.shop .show').hide().eq($(this).index()).show();
				else
					$(this).show();
			}).on('mouseout','ul li,.show',function(){
				if($(this)[0].nodeName=="LI")
					$('.shop .show').hide();
				else
					$(this).hide();
			});
			//fixed定位的显示菜单
			$(document).on('mouseover','#showall,.shop',function(){
					$('.shop').show();
			}).on('mouseout','#showall,.shop',function(){
					$('.shop').hide();
			});
		});

		//主题市场展示
		$.getJSON('/data/theameMark.json',function(data){
			var shoplist={
					list:data
				};
			var html = template('shoplist',shoplist);
			$('.banner .wrap,.shop').append(html);


			$.getJSON('/data/bantuijian.json',function(data){
				var bantuijian={
						list:data
					};
				var html = template('bantuijian',bantuijian);
				$('.banner .wrap .show .right,.shop .show .right').append(html);
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
		};


		//红人穿搭
		$.getJSON('/data/hotmen.json',function(data){
			var arrOut=data,arrIn=[],timer=null,
			    $imgs = $('.hotmen .con .left').find('img'),
			    $ps = $('.hotmen .con .left').find('p'),index2pre = -1;
			$imgs.each(function(index,elem){
				$(elem).attr({"src":data[index].url});
				$ps.eq(index).text(data[index].title);
				arrIn.push(data[index]);
			});
			timer = setInterval(function(){
				var index = Math.floor(Math.random()*arrOut.length),index2 = Math.floor(Math.random()*arrIn.length),
			   		$imgs = $('.hotmen .con .left').find('img'),$ps = $('.hotmen .con .left').find('p');
				while($.inArray(arrOut[index],arrIn) != -1){
					index = Math.floor(Math.random()*arrOut.length);
				};
				while(index2pre == index2){
					index2 = Math.floor(Math.random()*arrIn.length);
				};
				// console.log($ps.eq(index2).text())//之前获取到的$ps在这里已经变化了，不能在使用，要从新再次获取
				for(var i=0,len=arrIn.length;i<len;i++){
					if(arrIn[i].title==$ps.eq(index2).text()){
						arrIn.splice(i,1);
						break;
					}
				};
				// var nowa = $('.hotmen .con .left').children('a').eq(index2)[0];
				// var t = new TimelineMax();console.log(nowa)
				// t.to(nowa,1,{
				// 	rotationY:90,
				// 	onComplete:function(){
				// 		$imgs.eq(index2).attr({"src":arrOut[index].url});
				// 		$ps.eq(index2).text(arrOut[index].title);
				// 		console.log(nowa)		
				// 	}
				// });
				// t.to(nowa,1,{
				// 	rotationY:0
				// });
				$imgs.eq(index2).attr({"src":arrOut[index].url});
				$ps.eq(index2).text(arrOut[index].title);
				arrIn.push(arrOut[index]);
				index2pre = index2;
			},4000);
		});


		//轮播2
		(function(){
			var divW = $('.jxzt .lungo>div').eq(0).outerWidth(true),current=1,timer=null,offbtn=true,prevclick=false,
			divonew = 3 * divW,
			divLen = $('.jxzt .lungo>div').length,
			divonelen = divLen/3,
			$circle = $('.jxzt .title p span');
			$('.jxzt .lungo').css({
				width:divLen * divW,
				left:-divonew
			});
			$('.jxzt').hover(function(){
				$('#prev,#next').show();
				clearInterval(timer);
			},function(){
				$('#prev,#next').hide();
				timer = setInterval(change,2000);
			});

			$('#next').click(function(){
				prevclick = false;
				change();
			});
			$('#prev').click(function(){
				prevclick = true;
				change();
			})

			$circle.mouseover(function(){
				current = $(this).index();
				change();
			})

			timer = setInterval(change,2000);
			function change(){
				if(offbtn){
					offbtn = false;
					prevclick ? current-- : current++;
					$('.jxzt .lungo').stop().animate({'left':-current * divonew},function(){
						if(current >= divonelen-1){
							$('.jxzt .lungo').css({
								left:-divonew
							});
							current = 1;		
						}else if(current <= 0){
							$('.jxzt .lungo').css({
								left:-(divonelen-2)*divonew
							});
							current = divonelen-2;
						};
						offbtn = true;
						prevclick = false;
					});
					if(current >= divonelen-1){
						$circle.eq(0).siblings().removeClass('active').end().addClass('active');
					}else if(current <= 0){
						$circle.eq($circle.length-1).siblings().removeClass('active').end().addClass('active');
					}else{
						$circle.eq(current-1).siblings().removeClass('active').end().addClass('active');	
					}
				}
			}	
		})();
		

		//楼层数据
		$.getJSON('/data/lou.json',function(data){
			var lou = {
				list:data
			};
			html = template('loutemp',lou);
			$('#lou').append(html);
		});

		//猜我喜欢
		$.getJSON('/data/cwxh.json',function(data){
			var cwxh = {
				list:data
			};
			html = template('cwxh',cwxh);
			$('.cwxh .con').append(html);
		});

		//侧边栏
		(function(){
			$(window).scrollTop()>0 ? $('#totop').show() :　$('#totop').hide();
			$(window).scroll(function(){
				$(window).scrollTop()>0 ? $('#totop').show() :　$('#totop').hide();
				$(window).scrollTop()>500 ? $('.bar').show() :　$('.bar').hide();
			});
			$('#totop').click(function(){
				$(document.body).animate({scrollTop:0});
			})
		})();

		//跑楼梯
		(function(){
			var headerH = $('.hotmen').offset().top,
				viewH = $(window).height(),
				isWheel = true,
				len = $('.palouti a').length,
				$as = $('.palouti a');
			$(window).scroll(function(){
				var scrolltop = $(window).scrollTop();
				if(scrolltop > headerH - viewH/2) $('.palouti').show(200);
				else $('.palouti').hide(200);
				console.log($('.hotmen,.jxzt,.lou>div'))
				$('.hotmen,.jxzt,.lou>div').each(function(index,elem){
					if(index > len-1) return;
					var elemH=$(elem).offset().top-viewH/2;
					if($(window).scrollTop() > elemH){
						$as.eq(index).addClass('active').siblings().removeClass('active');
					}
				})
			});

		})();
	});
});