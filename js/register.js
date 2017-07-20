require(['config'],function(){
	require(['jquery','cookie','footer'],function($){
		var tel = false,yzm = false;
		//tel
		$('#tel').on('blur',function(){
			var reg = /^1\d{6,10}$/;
			if(!reg.test($(this).val())) {
				$('.warning').show();
				tel = false;
			}
			else {
				$('.warning').hide();
				tel = true;
			};
		});
		$('#tel').on('focus',function(){
			$('.warning').hide();
		});

		//yzm
		$('.yzm a').on('click',function(){
			$(this).html('重新生成验证码');
			var arr=[],str='';
			while(arr.length < 4){
				var num = Math.floor(Math.random()*75 + 48);
				while(!(48<=num&&num<=57||65<=num&&num<=90||97<=num&&num<=122)){
					num = Math.floor(Math.random()*75 + 48);
				}
				arr.push(num);
			}
			for(var i=0;i<arr.length;i++){
				str += String.fromCharCode(arr[i]);
			}
			$('.yzm p').show().html(str);
		})
		$('.yzm input').on('blur',function(){
			if($(this).val()==$('.yzm p').html()){
				yzm = true;
			}else{
				$('.warning').show();
			};
		});

		$('.yzm input').on('focus',function(){
			$('.warning').hide();
		});

		//点击跳转
		$('.btn').on('click',function(e){
			var ck = $('.xieyi .check').prop('checked')
			if( tel && yzm && ck){
				$.cookie.json = true;
				$.cookie('user',{
					username : $('#tel').val(),
					country :　$('select').val(),
					password : $('#psw').val()
				},{expires:7,path:"/"});
				location = '/';
				e.preventDefault();				
			}else{
				alert('输入有误，请从新输入');
			}
		})

	})
})