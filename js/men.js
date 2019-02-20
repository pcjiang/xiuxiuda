$(function(){
    men_list();
})
//获取管理员列表函数
function men_list(){
    $.ajax({
        type:"get",
        async:false,
        url:config.domainApi+"/branch_user/branchUserList",
        data:{
            callback_url:window.location.href,
            code:code,
            branch_id:branch_id
        },
        success:function(res){
            checkLogin(res);
            if(res.state == 0){
                alert(res.msg);
            }else{
                var html="",res=res.list.data;
                var title='<span>'+branch_name+'成员管理</span>';
                for(var i=0;i<res.length;i++){
                    html+='<div class="informations"><p>'+res[i].role_info.name+'</p><p>'+res[i].signature+'</p><p>'+res[i].mobile+'</p><p style="color:#70ABED" onclick="edit_members(this)">编辑<i style="display:none ;">'+res[i].user_id+'</i></p></div>'
                }
                $(".info").append(html);
                $(".top").html(title);
            }
        }
    })
}
//增加成员
function add_members() {
    location.href='user.html?branch_id='+branch_id+'';
}
//编辑成员
function edit_members(e) {
    var user_id = $(e).find("i").text();
    location.href='edit.html?branch_id='+branch_id+'&user_id='+user_id+'';
}