require(['config'],function(){
	require(['jquery','cookie','footer'],function(){
		//判断用户存在？
		$('.btn').on('click',function(){
			$.cookie.json = true;
			var user = $.cookie('user') || {},hasuser = false;
			$.each(user,function(key,value){
				if(key == 'username' && value == $('.tel input').val()){
					if($('.psw input').val()==user.password){
						hasuser = true;
						return false;	
					}
				}
			});
			if(hasuser) location = '/';
			else alert('用户名或密码错误！');
		});
	});
})