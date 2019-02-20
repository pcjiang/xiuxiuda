/**
 * 公共函数
 */

/*模块块化--手机端适配*/
function remInit(doc) {
	//计算rem
	var scale = 1 / devicePixelRatio;
	if(doc.documentElement.clientWidth < 375) {
		scale = 0.333;
	}
	doc.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 10 + 'px';
}
function initAjax(fType, bol, tURL, obj, succ, dtType,isJump=1) {
	//=========================上面是判断要去向的地址==================
	$.ajax({
		type: fType, //请求方式
		async: bol, //false 为同步请求，true为异步(默认)
		url: tURL, //请求地址
		cache: false, //不用缓存，默认为true
		ifModified: true, //默认为false
		data: obj, //数据类型
		success: (res) => {
			if(isJump==1){
				if( res.state!='1'){
					if(res.state!='4'){
						res.state=='2'?(location.href = res.redirect_url):alert(res.msg);
						return;
					}
				}
			}
		    succ(res);
		}, //请求成功回调
		error: (err) => {
			console.log(err, tURL);
		}, //请示失败回调
		dataType: dtType //参数类型 ---比如json
	});
}
/*获取链接地址参数   url:链接地址   name:参数-------提示:有中文的时候，产生乱码，此方法不能用*/
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}       
/*微信启动函数*/
function wxStart(infoObj, arr) {
	wx.config({
		debug: false,
		appId: infoObj.appId,
		timestamp: infoObj.timestamp,
		nonceStr: infoObj.nonceStr,
		signature: infoObj.signature,
		jsApiList: arr
	});
	wx.error((res) => {
		console.log(res.errMsg);
	});
}
//定义微信支付接口
function choosePay(info, pSucc, pCancel, pFail) {
	wx.chooseWXPay({
		timestamp: info.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: info.nonceStr, // 支付签名随机串，不长于 32 位
		package: info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		paySign: info.paySign, // 支付签名
		success: function(res) {
			pSucc(res);
		},
		cancel: function(res) {
			pCancel(res);
		},
		fail: function(res) {
			pFail(res);
		}
	});
}
//时间格式化 小时 分
function timer(time) {
	var date = new Date();
	var qq = parseInt(Date.parse(date) / 1000);
	var q = qq - time;
	var hour = parseInt(q / 3600);
	var min = parseInt((q - hour * 3600) / 60)
	return hour + '小时' + min + "分";
}
//时间格式化 2017/10/12 13:14:20
function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/-/g, "/");
}

function split_time(time) { //将当前时间转换成时间搓 例如2013-09-11 12:12:12 
	var arr = time.split(" ");
	var day = arr[0].split("-");
	var hour = arr[1].split(":");
	return Date.UTC(day[0], (day[1] - 1), day[2], hour[0], hour[1], hour[2]) / 1000; //将当前时间转换成时间搓 
} 

//时间搓得到实践
function changeTime(time,nn=1) {
	
	var date = new Date(time*1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate();
	var H = date.getHours();
	var MIN = date.getMinutes();
	var S = date.getSeconds();
	var newTime;
	if(nn==1){
		newTime=H+"小时"+MIN+"分" + S+"秒";
	}else{
		newTime= Y+M+D+" "+ H +":"+ (MIN<10?"0"+MIN:MIN) +":"+ (S<10?"0"+S:S);
	} 
	return newTime;
}

/*数据储存*/
function setLS(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
	var obj = localStorage.getItem(key);
	obj = obj != "undefined" ? JSON.parse(obj) : null;
	return obj;
}

function removeLS(key) {
	localStorage.removeItem(key);
}

//获取当前时间戳(秒)
function time(){
	return Date.parse(new Date())/1000;
}

//校验是否登录
function checkLogin(res){
	if(res.state != 2){
		return;
	}
    location.href=res.redirect_url;//跳转微信页面登录
    return;
}

 /**
 * 按钮定时器
 * @param number seconds 秒
 * @param string id 元素id值
 * @param object callback 回调函数执行逻辑
 * @author 彭超 2019/1/24 
 */
function countDown(seconds, id="null", callback){
	var timer = [];
	timer[id] = setInterval(function(){
	   seconds--;
	   if(id != "null"){
		   $("#" + id).html(seconds)
	   }   
	   if(seconds <= 0){
		   clearInterval(timer[id]);
		   callback(id);
	   }
	},1000)
}
