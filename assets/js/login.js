$(function () {
    // 登录表单和注册表单
    $('#link_reg').click(function () {
        //1.点击去注册 登录页面隐藏，注册表单显示
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })
    form.verify({
    pwd:[
        /^[\S]{6,12}$/,
        '密码必须6-12字符'
    ],
    repwd:function(value,item){
        //value 是表单元素的值
        //item 是表单元素的dom对象

        //return '校验失败的提示信息'
        //校验确认密码和密码的值是否一致
        //获取密码框的值
        var password  =$('#form_reg [name=password]').val()
        if(value !== password){
            return '两次密码不一致'
        }
    }

})
 var layer = layui.layer 
    // 注册功能
    $('#form_reg').on('submit', function(e){
        e.preventDefault();
        var data = $(this).serialize()

        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg(res.message)
                }
                layer.msg(res.message, function () {
                    $('#link_login').click()
                })
            }

        })
    })
    //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: data,
            success: function (res) {
                // console.log(res.message);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, function () {
                    // console.log(res); token
                    //添加标识符
                    localStorage.setItem('token',res.token)
                   //成功跳转页面
                    location.href ='/index.html'
  
                })
                
            }

        })
    })

})