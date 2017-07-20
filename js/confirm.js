require(['config'],function(){
	require(['jquery','template','cookie','header','footer'],function($,template){

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

		//获取付款商品
		$.cookie.json = true;
		var toPay = $.cookie('toPay');
		console.log(toPay);
		(function(){
			var data = {
				list : toPay
			};
			var html = template('toPay',data);
			$('.confirm .products').append(html);
		})();


		//手机验证
		$('.address .tel input').on('blur',function(){
			var reg = /^1\d{10}/;
			if(!reg.test($(this).val())) $(this).siblings('.message').show();
			else $(this).siblings('.message').hide();
		});
	})
})