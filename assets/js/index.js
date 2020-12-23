$(function () {
    //获取用户信息
    getUserInfo()
    function getUserInfo() {
        // console.log(localStorage.getItem('token'));
        $.ajax({
            type: 'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                renderAvatar(res.data)
            }
        })
    }
    function renderAvatar(info) {
        // 渲染欢迎语
        var name = info.nickname || info.username
        $('#welcome').html('欢迎' + name)
          //渲染头像
        //判断user_pic是否有值
        if(info.user_pic) {
            $('.layui-nav-img').attr('src',info.user_pic)
            //隐藏文字头像
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide()
            var first = name.substr(0,1).toUpperCase()
            $('.text-avatar').html(first)
        }
    }
    // 退出登录
       $('#logout').on('click',function(){
        layui.layer.confirm('确认退出账号？', {icon: 3, title:'提示'}, function(index){
            // 退出代码，清空token
            localStorage.removeItem('token');
            // 跳转到登录页
            location.href ="/login.html"
            
            layer.close(index);
          })
    })




})