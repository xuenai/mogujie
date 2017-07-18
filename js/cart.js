require(['config'],function(){
	require(['jquery','template','cookie','header','footer'],function($,template){
		$.cookie.json = true;
		var products = $.cookie('products') || [];
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


		//获取商品cookie
		(function(){
			var data = {
				list : products
			};
			var html = template('shangping',data);
			$('.content .goods').html(html);
		})();

		//删除
		$('.good1').on('click','.delate',function(e){
			var index = $('.good1').index($(this).parents('.good1'));
			products.splice(index,1);
			$.cookie('products',products);
			$(this).parents('.good1').remove();
		});


		//增加商品数量,计算价格
		$('.low').on('click',function(){
			var $xj = $(this).parents('.good1').find('.pri');
			var price = Number($(this).parents('.good1').find('.now').text());
			var $numinput = $(this).siblings('.num');
			if((Number($numinput.val())-1)<1){
				$numinput.val(1);
				$xj.text(price.toFixed(2));
			}else{
				$numinput.val(Number($numinput.val())-1);
				$xj.text((price * Number($numinput.val())).toFixed(2));
			};

		});
		$('.add').on('click',function(){
			var $xj = $(this).parents('.good1').find('.pri');
			var price = Number($(this).parents('.good1').find('.now').text());
			var $numinput = $(this).siblings('.num');
			if((Number($numinput.val())+1)>192){
				$numinput.val(192);
				$xj.text((price * 192).toFixed(2));
			}else{
				$numinput.val(Number($numinput.val())+1);
				$xj.text((price * Number($numinput.val())).toFixed(2));
			}
		});
		$('.num').on('focus',function(){
			this.prevValue = $(this).val();
		})
		$('.num').on('blur',function(){
			if(Number($(this).val())){
				if(Number($(this).val())<1 || Number($(this).val())>192){
					$(this).val(this.prevValue);
				}	
			}else{
				$(this).val(this.prevValue);
			}
			var $xj = $(this).parents('.good1').find('.pri');
			var price = Number($(this).parents('.good1').find('.now').text());
			$xj.text((price * Number($(this).val())).toFixed(2));
		});

		//单独复选框
		console.log($('.good1>input'))
		$('.good1>input').on('click',function(){
			if($(this).prop('checked')){
				$(this).parents('.good1').addClass('active');
			}else{
				$(this).parents('.good1').removeClass('active');
			}
		})
	})
})