define(['jquery'],function(){
	$.get('/html/include/footer.html').then(function(data){
		$('.footer').html(data);
	})
});