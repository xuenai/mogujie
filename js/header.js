define(["jquery","cookie"],function(){
	$.get('/html/include/header.html',function(data){
		$('.header').append(data);
		
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