new Vue({
	el:"#app",
	data:{//模型的操作
	   totalMoney:0,/*总金额*/
	   productList:[],/*商品列表*/
	   checkAll:false,/*全选*/
	   delFlag:false,/*删除商品*/
	   curProduct:''/*当前商品*/
	},
	filters:{//（局部）过滤器
		formatMoney:function(value){
			return "￥"+value.toFixed(2);//返回货币符号和两位小数
		}
	},
	mounted:function(){//生命周期的一部分，实例化完成之后，默认要查询某一个方法
	  this.$nextTick(function(){
	  	this.cartView();
	  });		
	},
	methods:{//事件的绑定
		cartView:function(){
			let _this=this;
			this.$http.get("data/cartData.json",{"id":123}).then(res=>{
				this.productList=res.body.result.list;
				//this.totalMoney=res.body.result.totalMoney;
			});			
//			var _this=this;
//			this.$http.get("data/cartData.json",{"id":123}).then(function(res){
//			  //console.log(res);			  
//			  _this.productList=res.body.result.list;//res.body是一个整体
//			  _this.totalMoney=res.body.totalMoney;
//			});//在vue实例里面调取http方法
	},
	changeMoney:function(product,way){/*改变金额格式*/
		if(way>0){
			product.productQuantity++;
		}else{
			product.productQuantity--;
			if(product.productQuantity<1){
				product.productQuantity=1;
			}
		}
		this.calTotalPrice();
	},
	selectedProduct:function(item){/*选择商品*/
		if(typeof item.checked=='undefined'){//判断item里的checked是否存在
			//Vue.set(item,"checked",true);//Vue全局注册，在item里面添加一个checked属性
		    this.$set(item,"checked",true);//局部注册
		}else{
			item.checked=!item.checked;
		}
		this.calTotalPrice();
	},
	selectedAll:function(flag){/*全选和取消全选*/
		this.checkAll=flag;
		var _this=this;		
		this.productList.forEach(function(item,index){
				if(typeof item.checked=='undefined'){			
		              _this.$set(item,"checked",true);
		         }else{
			          item.checked=_this.checkAll;
		         }
			});
			this.calTotalPrice();
	},
	calTotalPrice:function(){/*计算总金额*/
		var _this=this;
		_this.totalMoney=0;//遍历之前总金额清零
		this.productList.forEach(function(item,index){
			if(item.checked){
				_this.totalMoney+=item.productPrice*item.productQuantity;
		    }
	    });
    },
    delConfirm:function(item){/*删除商品提示*/
   	   this.delFlag=true;
   	   this.curProduct=item;
    },
    delProduct:function(){/*删除商品*/
    	var index=this.productList.indexOf(this.curProduct);//获取当前商品的索引
    	this.productList.splice(index,1);
    	this.delFlag=false;
    }
}
});