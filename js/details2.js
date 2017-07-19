require(['config'],function(){
	require(['jquery','template','header','footer'],function($,template){
		$.cookie.json = true;

		//搜索栏部分
		$('.search .top-l,.bar .top-l').hover(function(){
			$(this).find('ul').show();
		},function(){
			$(this).find('ul').hide();
		});

		$('.search .top-l li,.bar .top-l li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		});

		$('.search .top .txt').focus(function(){
			$('.search .top .history').show();
		}).blur(function(){
			$('.search .top .history').hide();
		});

		$('.bar .top .txt').focus(function(){
			$('.bar .top .history').show();
		}).blur(function(){
			$('.bar .top .history').hide();
		});

		$.getJSON('/data/searchHot.json',function(data){
			var searchHot={
					list:data
				};
			var html = template('search-hot',searchHot);
			$('.wrap .center .bottom').html(html);
		});


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


		//选项卡
		$('.tab .title a').on('click',function(){
			var index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.show').hide().eq(index).show();
		})


		//全部商品显示,啦啦啦~~~
		$('.bigTitle .all,.bigTitle .more').on('mouseover',function(){
			$('.bigTitle .more').show();
		}).on('mouseout',function(){
			$('.bigTitle .more').hide();
		});

		//增加商品数量
		$('#low').on('click',function(){
			if((Number($('#num').val())-1)<1){
				$('#num').val(1);
			}else{
				$('#num').val(Number($('#num').val())-1);
			}
		});
		$('#add').on('click',function(){
			if((Number($('#num').val())+1)>192){
				$('#num').val(192);
			}else{
				$('#num').val(Number($('#num').val())+1);
			}
		});
		$('#num').on('focus',function(){
			this.prevValue = $(this).val();
		})
		$('#num').on('blur',function(){
			if(Number($(this).val())){
				if(Number($(this).val())<1 || Number($(this).val())>192){
					$(this).val(this.prevValue);
				}	
			}else{
				$(this).val(this.prevValue);
			}
		})


		//选择尺码
		$('.ruler').on('click','a',function(e){
			$(this).addClass('active').siblings().removeClass('active');
			e.preventDefault();
		})

		//放大镜
		$('.list').on('click','img',function(){
			var bigimg = ['/img/details/fdj1.jpg','/img/details/fdj2.jpg','/img/details/fdj3.jpg','/img/details/fdj4.jpg','/img/details/details4.jpg'];
			var index = $(this).parent().index();
			$('.pic img').attr('src',bigimg[index]);
			$(this).parent().addClass('active').siblings().removeClass('active');
			$('.bigpic img').attr('src',bigimg[index]);
		});
		$('.pic').on('mousemove',function(e){
			$('.pic .mask').show();
			$('.bigpic').show();
			var disx = e.pageX - $('.pic').offset().left-$('.pic .mask').innerWidth()/2,
				disy = e.pageY - $('.pic').offset().top-$('.pic .mask').innerHeight()/2,
				xmax = $('.pic').innerWidth()-$('.pic .mask').innerWidth(),
				ymax = $('.pic').innerHeight()-$('.pic .mask').innerHeight(),
				bilix = 0,
				biliy =0 ;
			disx < 0 ? disx = 0 : disx;
			disx > xmax ? disx = xmax : disx;
			disy < 0 ? disy = 0 : disy;
			disy > ymax ? disy = ymax : disy;		
			$('.pic .mask').css({
				left:disx,
				top:disy
			});
			bilix = disx / xmax;
			biliy = disy / ymax;
			$('.bigpic img').css({
				left : -bilix*100,
				top : -biliy*200
			})
		});
		$('.pic').on('mouseout',function(){
			$('.pic .mask').hide();
			$('.bigpic').hide();
		})


		//立即购买
		$('.btn a').on('click',function(){
			var products = $.cookie('products') || [];
			var product = 
				{
					des : $('.rgt p.title').text(),
					price : [Number($('.rgt .price .now span').text().slice(1)),Number($('.rgt .price .old span').text().slice(1))],
					count : Number($('#num').val()),
					ruler : $('.ruler .active').text() || "L",
					img : $('.list .active img').attr('src')
				}
			products.push(product);
			$.cookie('products',products,{expires:7,path:"/"});
		});

		require(['fly'],function(){
			$.cookie.json = true;
			//购物车
			$('.detail .btn span').on('click',function(e){
				var products = $.cookie('products') || [];
				var product = 
					{
						des : $('.rgt p.title').text(),
						price : [Number($('.rgt .price .now span').text().slice(1)),Number($('.rgt .price .old span').text().slice(1))],
						count : Number($('#num').val()),
						ruler : $('.ruler .active').text() || "L",
						img : $('.list .active img').attr('src')
					}
				products.push(product);
				$.cookie('products',products,{expires:7,path:"/"});


				var src = $(this).parents('.detail').find('li.active img').attr('src');
				var flyer = $('<img id="destory" src="'+src+'" style="width:50px;height:50px;border-radius:25px;" />');
				var offset = $('.side a:first img').offset();

				flyer.fly({
					start:{
						left : e.clientX,
						top : e.clientY
					},
					end:{
						top : offset.top - $(window).scrollTop(),
						left : offset.left - $(window).scrollLeft(),
						width : 10,
						height : 10
					},
					onEnd:function(){
						var total = 0;
						products = $.cookie('products');
						$('#destory').remove();
						$.each(products,function(i,obj){
							total += obj.count;
						});
						$('.side .goodscount').html(total);
						console.log(products);
					}
				})
			});
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
})