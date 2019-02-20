$(function(){
    getEquipment()
})
//获取网点所有设备
function getEquipment(){
    var title=branch_name+'设备管理'
    $.ajax({
        type:'get',
        async:false,
        url:config.domainApi+'/branch_host/list',
        data:{
            branch_id:branch_id,
        },
        success:function(res){
            if(res.state==0){
                alert(res.msg)                        
            }else{
                var html='',p=res.list.data
                for(var i=0;i<p.length;i++){
                    html+='<div onclick="products(this)"><p>'+p[i].host_name+'</p><b style="display:none ;">'+p[i].is_online+'</b><i style="display:none ;">'+p[i].id+'</i></div>'
                }
                $('.bottom').html(html)
                $('.top').find('span').html(title)
                var is_online=$('.bottom').find('b').text()
                if(is_online == 1){
                    $('.bottom').find('div').css('background-color','#F8ADAD')
                }else{
                    $('.bottom').find('div').css('background-color','#B7F8D1')
                }
            }
        }
    })
}
//销售记录
function salesRecords(){
    location.href='minutes.html?branch_id='+branch_id+''
}
//商品页面
function products(e){
    var host_id=$(e).find('i').text()
    var host_name=$(e).find('p').text()
    //保存数据
    setLS('host_name', host_name)
    location.href='products.html?branch_id='+branch_id+'&host_id='+host_id+''
}