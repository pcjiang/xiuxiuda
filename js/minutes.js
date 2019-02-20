$(function(){
    var title=branch_name+'设备管理';
    $(".top").find("span").html(title);
})
//获取销售记录
function salesRecords(){
    var kong='<div>详细记录</div><div class="info"><p>用户</p><p>柜号</p><p>支付金额</p><p>支付时间</p></div>';
    $(".bottom").html(kong);//先置空
    var spec_name=$(".room").val();
    var cabinet_number=$(".cabinet_id").val();
    var user_nickname=$(".name").val();
    var pay_time=$(".date").val();
    $.ajax({
        type:"get",
        async:false,
        url:config.domainApi+'/branch_host/getOrderList',
        data:{
            branch_id:branch_id,//网点id 必须
            spec_name:spec_name,
            cabinet_number:cabinet_number,
            user_nickname:user_nickname,
            pay_time:pay_time
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);                        
            }else{
                var html="",p=res.list.data;
                for(var i=0;i<p.length;i++){
                    var hours=p[i].pay_time.split(" ")[1];
                    var date=p[i].pay_time.split(" ")[0];
                    html+='<div class="information"><div><img src="'+p[i].user_avatar+'" alt=""><p>'+p[i].user_nickname+'</p></div><p>'+p[i].cabinet_number+'</p><p>'+p[i].pay_amount+'</p><p>'+p[i].pay_time+'</p></div>';
                }
                $(".info").after(html);
            }
        }
    })
}
//重置
function reset(){
    $(":input").val("");//所有input value值置空
}