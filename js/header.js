define(["jquery","cookie"],function(){
	$.get('/html/include/header.html',function(data){
		$.cookie.json = true;
		var user = $.cookie('user'); 
		if(user){
			$(data).find('.register,.login').hide().end()
				   .find('.user_in a').html('欢迎来自 '+user.country+'的 '+user.username+' 用户').end()
				   .appendTo('.header'); 
		}else{
			$('.header').append(data);
		}		
		$('.cartli,.kfli,.myshopli').hover(function(){
			$(this).find('.sh').show();
			console.log(1);
		},function(){
			$(this).find('.sh').hide();
		});

		$('.sh').find('li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		});
	});
});