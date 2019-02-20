$(function(){
    chooseHotel()
    var button=$('.top').find('button');
    //点击搜索
    button.on('click',function(){
        var branch_name=$('.top').find('input').val()
        chooseHotel(branch_name)
    })
})
//酒店网点函数
function chooseHotel(branch_name){
    $.ajax({
        type:'post',
        async:false,
        url:config.domainApi+'/branch/branchList',
        data:{
            callback_url:window.location.href,
            code:code,
            branch_name:branch_name
        },
        success:function(res){
            checkLogin(res)
            var html=''
            if(res.state == 0){
                alert('暂无此网点')
            }else{
                var res=res.lists.data
                if(res == ''){
                    $('.msg').css('display','block')
                    $('.bottom').html(html)
                }else{
                    $('.msg').css('display','none')
                    for(var i=0;i<res.length;i++){
                        html+='<div class="hotelName" onclick="chooseFunction(this)">'
                        html+=  '<p class="first">'+res[i].id+'</p>'
                        html+=  '<p>'+res[i].branch_name+'</p>'
                        html+=  '<b style="display:none ;">'+res[i].branch_name+'</b>'
                        html+=  '<i style="display:none ;">'+res[i].id+'</i>'
                        html+='</div>'
                    }
                    $('.bottom').html(html)
                }
            }}
    })
}
//酒店选择功能
function chooseFunction(e){
    var id=$(e).find('i').text()
    var branch_name=$(e).find('b').text()
    //保存数据
    setLS('id', branch_name)
    location.href='chooseFunction.html?branch_id='+id+''
}