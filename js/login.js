require(['config'],function(){
	require(['jquery','cookie','footer'],function(){
		//判断用户存在？
		$('.btn').on('click',function(){
			$.cookie.json = true;
			var user = $.cookie('user') || {},hasuser = false;
			$.each(user,function(key,value){
				if(key == 'username' && value == $('.tel input').val()){
					hasuser = true;
					return false;
				}
			});
			if(hasuser) location = '/';
			else alert('用户名未注册！');
		});
	});
})