$(function () {
    var form = layui.form
//    表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须是1-6个字符'
            }
        }
    })
    
    initUserInfo()
    // 获取表单数据
    function initUserInfo() {
        $.ajax({
            type:'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',  
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // return layer.msg(res.message)
                // 获取成功后渲染到页面
               /*  $('[name = username]').val(res.data.username)
                $('[name = nickname]').val(res.data.nickname)
                $('[name = email]').val(res.data.email)
                $('[name = id]').val(res.data.id) */
                

                //一键获取所有表单传的数据
                // 在html的表单中添加 lay-filter="formUserInfo"
                form.val('formUserInfo',res.data)
            }
        })
    }
    //提交表单修改数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //获取表单元素
        var data = $(this).serialize()
        // console.log(data);
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, function () {
                    // 让父网页更新
                    window.parent.getUserInfo()

                })
            }
        })
    })
    
    //重置表单事件
    $('#btnReset').click(function (e) {
        e.preventDefault()
        initUserInfo()
    })


})
