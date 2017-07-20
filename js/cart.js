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
			var products = $.cookie('products') || [];
			var index = $('.good1').index($(this).parents('.good1'));
			products.splice(index,1);
			$.cookie('products',products,{path:'/'});
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
			countTotal();

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
			countTotal();
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
			countTotal();
		});

		//单独复选框
		$('.good1>input').on('click',function(){
			if($(this).prop('checked')){
				$(this).parents('.good1').addClass('active');
			}else{
				$(this).parents('.good1').removeClass('active');
			}
			if($('.good1>input').length != $('.good1>input:checked').length){
				$('#getall').prop('checked',false);
			}else{
				$('#getall').prop('checked',true);
			}
			countTotal();
		});

		//计算总价，总数量
		function countTotal(){
			var totalMoney = 0,totalCount = 0;
			$('.compute .qfk').removeClass('active');
			$('.good1>input:checked').each(function(i,elem){
				var money = Number($(elem).parents('.good1').find('.pri').text());
				var count = Number($(elem).parents('.good1').find('.num').val());
				totalMoney += money;
				totalCount += count;
				$('.compute .qfk').addClass('active');
			})
			$('.compute .totalMoney').html(totalMoney.toFixed(2));
			$('.compute .totalCount').html(totalCount);
		}

		//全选
		$('#getall').on('click',function(){
			if($(this).prop('checked')){
				$('.good1>input').prop('checked',true).parents('.good1').addClass('active');
				countTotal();
			}else{
				$('.good1>input').prop('checked',false).parents('.good1').removeClass('active');
				countTotal();
			}
		});
		//清楚所有商品
		$('#delateAll').on('click',function(){
			$('.good1').find('.delate').trigger('click');
		})

		//去结算
		$('.compute .qfk').on('click',function(){
			var toPay = [];
			$('.good1>input:checked').parents('.good1').each(function(i,elem){
				var product = {
					des : $(elem).find('.center a').text(),
					price : Number($(elem).find('.right .now').text()),
					count : Number($(elem).find('.right .num').val()),
					xj : Number($(elem).find('.right .pri').text()),
					ruler : $(elem).find('.right span:first b:last').text() || "L",
					img : $(elem).find('.center img').attr('src')
				};
				toPay.push(product);
			});
			$.cookie('toPay',toPay,{path:'/'});
		})

		//侧边栏购物车数量
		countgoods();
		function countgoods(){
			var products = $.cookie('products') || [];
			var total = 0;
			$.each(products,function(i,obj){
				total += obj.count;
			});
			$('.side .goodscount').html(total);
		}
	})
})