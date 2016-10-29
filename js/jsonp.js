// jsonp请求京东商品列表
$(function(){
	// ajax异步请求
	$.ajax({
		type: "get",
		url: "https://dc.3.cn/category/get?callback=getCategoryCallback",
		dataType: "jsonp",
		jsonpCallback: "getCategoryCallback",
		scriptCharset: "gb2312",
		success: function(res){
			// 获取到主要的商品信息数据
			var data = res.data;
			
			for(var i = 0; i < data.length; i++){
				// 生成左侧的商品详情列表
				var htmlStr = "<li>";
				for(var j = 0; j < data[i].s.length; j++){
					var arr = data[i].s[j].n.split("|");
					if(j == data[i].s.length - 1){
						htmlStr += "<a href='http://" + arr[0] + "'>" + arr[1] + "</a>";	
					}else{
						htmlStr += "<a href='http://" + arr[0] + "'>" + arr[1] + "、</a>";
					}
				}
				htmlStr += "<span>&gt<span></li>";
				$("#productListLeft").append(htmlStr);
				
				// 为左侧的每个li添加鼠标移入事件
				$("#productListLeft").on("mouseenter", "li", function(){
					$(this).addClass("active").children("a").addClass("childActive").siblings("span").hide();
					$(".productListRight").eq($(this).index()).show().siblings(".productListRight").hide();
				}).on("mouseleave", "li", function(){
					$(this).removeClass("active").children("a").removeClass("childActive").siblings("span").show();
					$(".productListRight").hide();
				})
				
				// 为右侧的每个div添加鼠标移入事件
				$(".productList").on("mouseenter", ".productListRight", function(){
					$(this).show().siblings(".productListRight").hide();
					$("#productListLeft li").eq($(this).index()).addClass("active").children("a").addClass("childActive").siblings("span").hide();
				}).on("mouseleave", ".productListRight", function(){
					$(".productListRight").hide();
					$("#productListLeft li").removeClass("active").children("a").removeClass("childActive").siblings("span").show();
				})
				
				// 生成右侧的商品列表
				var productListRight = $("<div/>");
				productListRight.addClass("productListRight");
				var left = $("<div/>");
				left.addClass("left");
				
				// 右侧的头部标题
				var title = $("<ul/>");
				title.addClass("title");
				
				htmlStr = "";
				for(var j = 0; j < data[i].t.length; j++){
					var arr = data[i].t[j].split("|");
					htmlStr += "<li><a href='http://" + arr[0] + "'><span>" + arr[1] + "</span><b>&gt;</b></a></li>";
				}
				title.append(htmlStr);
				left.append(title);
				
				// 下部的主要商品内容
				for(var j = 0; j < data[i].s.length; j++){
					for(var z = 0; z < data[i].s[j].s.length; z++){
						console.log(data[i].s[j].s[z].n);
						var oDl = $("<dl/>");
						var arr = data[i].s[j].s[z].n.split("|");
						var oDt = $("<dt/>").html("<a href='http://" + arr[0] +"'>" + arr[1] + "<span>&gt;</span></a>");
						var oDd = $("<dd/>");
						
						for(var x = 0; x < data[i].s[j].s[z].s.length; x++){
							//<a href=''></a>
							var arr = data[i].s[j].s[z].s[x].n.split("|");
							oDd.append("<span><a href='http://" + arr[0] +"'>" + arr[1] + "</a><span>");
						}
						
						oDl.append(oDt);
						oDl.append(oDd);
						left.append(oDl);
					}
				}
				
			
				// 右侧的图片
				var right = $("<div/>");
				right.addClass("right");
				var rightTop = $("<ul/>");
				rightTop.addClass("rightTop");
				var rightBottom = $("<div/>");
				rightBottom.addClass("rightBottom");
				for(var j = 0; j < 8; j++){
					var arr = data[i].b[j].split("|");
					rightTop.append("<li><a href='http://" + arr[0] + "'><img title='" + arr[1] + "' src='http://img10.360buyimg.com/" + arr[2] + "' /></a></li>");
				}
				for(var j = 0; j < data[i].p.length; j++){
					var arr = data[i].p[j].split("|");
					rightBottom.append("<a href='http://" + arr[0] + "'><img title='" + arr[1] + "' src='http://img10.360buyimg.com/" + arr[2] + "' /></a>");
				}
				
				//
				right.append(rightTop);
				right.append(rightBottom);
				
				productListRight.append(left);
				productListRight.append(right);
				$("#productListRight").append(productListRight);
			}
		}
	});
})
