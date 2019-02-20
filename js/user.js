$(function(){
    user();//页面第一次加载
})
//用户列表
function user(page){
    var keywork=$(".center").find("input").val();
    var title="";
    var arr = [];
    for(var i in role_list){
        arr.push(role_list[i]);
    }
    for(var i=0;i<arr.length;i++){
        title+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
    }
    $("#signature").html(title);
    $.ajax({
        type:"get",
        async:false,
        url:config.domainApi+"/branch_user/userList",
        data:{
            callback_url:window.location.href,
            code:code,
            branch_id:branch_id,//网点id
            keywork:keywork,//用户昵称
            page:page,//分页
        },
        success:function(res){
            checkLogin(res);
            if(res.state == 1){
            html="",res=res.user_list.data;
            for(var i=0;i<res.length;i++){
                html+='<div><p>'+res[i].user_nickname+'</p><img src="'+res[i].avatar+'" alt=""><i style="display:none ;">'+res[i].id+'</i></div>';
            }  
            $(".bottom").html(html);
            }else{
                alert(res.msg);
            }
        }
    })
}
//增加成员
function add_members(){
    alert(1);
    var keywork=$("#top").find("input").val();
    var mobile=$(".phone").val();
    var role=$("#signature option:selected").val();
    $.ajax({
        type:"post",
        async:false,
        url:config.domainApi+"/branch_user/addBranchUser",
        data:{
            callback_url:window.location.href,
            code:code,
            branch_id:branch_id,//网点id
            signature:signature,//姓名
            role:role,//角色id
            mobile:mobile,//手机号
            user_id:1,//用户id
        },
        success:function(res){
            checkLogin(res);
            if(res.state == 1){
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        }
    })
}