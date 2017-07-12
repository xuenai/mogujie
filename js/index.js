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
		
		$.getJSON('/data/theameMark.json',function(data){
			var theame={
					list:data
				};
			var html = template('theamemark',theame);
			$('.banner .wrap ul').html(html);

			$('.banner ul li').hover(function(){console.log(0)
				$(this).css('background-color','white');
			},function(){
				$(this).css('background-color','');
			});
		});
	});
});