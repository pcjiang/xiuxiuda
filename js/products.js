$(function(){
    getCabinet();
    products();
})
//获取柜门列表
function getCabinet() {
    var title=branch_name+'设备管理';
    $.ajax({
        type:"get",
        async:false,
        url:config.domainApi+'/branch_host_cabinet/list',
        data:{
            branch_id:branch_id,
            host_id:host_id,
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);                        
            }else{
                var html="",p=res.list.data;
                for(var i=0;i<p.length;i++){
                    html+=' <div><p>'+p[i].id+'号柜门</p><div><p class="name">'+p[i].goods_name+'</p><p class="price">'+p[i].goods_price+'</p></div></div>'
                }
                $(".bottom").html(html);
                $(".top").find("span").html(title);
                $(".top").find("p").html(host_name);
            }
        }
    })
}
//一键下架商品
function lowerShelf() {
    $.ajax({
        type:"post",
        async:false,
        url:config.domainApi+"/branch_host_cabinet/clearCabinetAllGoods",
        data:{
            branch_id:branch_id,
            host_id:host_id,
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        }
    })
}
//一键补货
function replenishment() {
    $.ajax({
        type:"post",
        async:false,
        url:config.domainApi+"/branch_host_cabinet/addGoodsToCabinet",
        data:{
            branch_id:branch_id,
            host_id:host_id,
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        }
    })
}
//获取网点商品列表
function products(){
    $.ajax({
        type:"get",
        async:false,
        url:config.domainApi+'/branch_host_cabinet/goodsList',
        data:{
            branch_id:branch_id,
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);                        
            }else{
                var html="",p=res.list.data;
                for(var i=0;i<p.length;i++){
                    html+='<option value="'+p[i].id+'">'+p[i].goods_name+'</option>';
                }
                $("#signature").html(html);
            }
        }
    })
}

//设置柜门商品信息
function setPrice(){
    $("#alert").css("display","none");
    var goods_price=$("#center").find("input").val();
    var goods_id=$("#signature option:selected").val();
    $.ajax({
        type:"post",
        async:false,
        url:config.domainApi+'/branch_host_cabinet/setCabinetGoods',
        data:{
            branch_id:branch_id,
            cabinet_id:host_id,//设备ID
            goods_id:goods_id,//商品id
            goods_price:goods_price,//商品价格
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg);                        
            }else{
                var html="",p=res.list.data;
                for(var i=0;i<p.length;i++){
                    html+='<option>'+p[i].goods_name+'</option>';
                }
                $("#signature").html(html);
            }
        }
    })
}
//点击显示
function display(){
    $("#alert").css("display","block");
}