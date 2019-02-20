$(function(){
    choose_function()//调用函数
})
//酒店当前权限列表
function choose_function(){
    $.ajax({
        type:'post',
        async:false,
        url:config.domainApi+'/Branch_user_auth/list',
        data:{
            branch_id:branch_id
        },
        success:function(res){
            if(res.state == 0){
                alert(res.msg)
            }else{
                //保存数据
                setLS('role_list', res.role_list)
                var html='',res=res.auth_list
                for(var i=0;i<res.length;i++){
                    if(res.length == 1){
                        html='<span>'+branch_name+'</span><div onclick="deviceManagement()"><p class="number">56台</p><p>'+res[i].name+'</p></div>'
                    }else if(res.length == 2){
                        html='<span>'+branch_name+'</span><div onclick="deviceManagement()"><p class="number">56台</p><p>'+res[0].name+'</p></div><div><p class="title">'+res[1].name+'</p></div>'
                    }else{
                        html='<span>'+branch_name+'</span><div onclick="deviceManagement()"><p class="number">56台</p><p>'+res[0].name+'</p></div><div><p class="title">'+res[1].name+'</p></div><div onclick="member_management()"><p class="title">'+res[2].name+'</p></div>'
                    }
                }
                $('.content').html(html)
            }
        }
    })
}
//成员管理页面
function member_management(){
    location.href='men.html?branch_id='+branch_id+''
}
//设备管理页面
function deviceManagement(){
    location.href='deviceManagement.html?branch_id='+branch_id+''
}
//流水查看页面  暂未开通
function flowView(){
    location.href='water.html?branch_id='+branch_id+''
}