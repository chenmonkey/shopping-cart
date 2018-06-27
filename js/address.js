new Vue({
	el:'.container',
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,/*地址卡片方式索引*/
		shippingMethod:1,/*配送方式索引*/
		delFlag:false,/*删除地址*/
		revFlag:false/*修改地址*/
		
		
	},
	mounted:function(){//钩子函数
		this.$nextTick(function(){
			this.getAddressList();
		});	
	},
	computed:{
		filterAddress:function(){//显示地址卡片
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList:function(){/*渲染地址*/
			var _this=this;
			this.$http.get("data/address.json").then(response=>{
				var res=response.data;				
				if(res.status=="0"){//请求成功					
					this.addressList=res.result;
				}
			})
			
		},
		setDefault:function(addressId){/*选择默认地址*/
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			})
		},
		delConfirm:function(item){
			this.delFlag=true;
			this.currentIndex=item;
		},
		delAddress:function(){
			
			this.addressList.splice(this.currentIndex,1);
			this.delFlag=false;
		},
		revConfirm:function(item){
			this.revFlag=true;
			this.currentIndex=item;
		}

	}
});
	

