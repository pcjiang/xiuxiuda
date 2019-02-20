$(function(){
    var title="";
    var arr = [];
    for(var i in role_list){
        arr.push(role_list[i]);
    }
    for(var i=0;i<arr.length;i++){
        title+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
    }
    $("#signature").html(title);
})
//编辑用户
function add_members() {
    var signature=$("#top").find("input").val();
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
            user_id:user_id,//用户id
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
//删除成员
function remove_members() {
    $.ajax({
        type:"post",
        async:false,
        url:config.domainApi+"/branch_user/delBranchUser",
        data:{
            callback_url:window.location.href,
            code:code,
            branch_id:branch_id,//网点id
            user_id:user_id,//用户id
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