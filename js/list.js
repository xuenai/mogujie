require(['config'],function(){
	require(['jquery','template','header','footer'],function($,template){
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

		//猜我喜欢
		getJson('/data/cwxh.json');
		function getJson(url){
			$.getJSON(url,function(data){
				var cwxh = {
					list:data
				};
				html = template('cwxh',cwxh);
				$('.ad').append(html);
			});
		}

		//价格区间
		$('.lou .range a').eq(0).on('click',function(){console.log(55);
			$('.ad>div').hide();
			getJson('/data/cwxh2.json');
		});
		$('.lou .range a').eq(1).on('click',function(){console.log(55);
			$('.ad>div').hide();
			getJson('/data/cwxh.json');
		});
		$('.lou .range a').eq(2).on('click',function(){console.log(55);
			$('.ad>div').hide();
			getJson('/data/cwxh2.json');
		});

		//让列表图片点击跳转到详情页面
		$('.lou .ad').on('click','a',function(e){
			e.preventDefault();
			location = '/html/details2.html';
		})
	})
})