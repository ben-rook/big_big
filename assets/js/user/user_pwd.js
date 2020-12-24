$(function () {
    var form = layui.form
    // 自定义正则表达
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码输入6-12位数字'
        ],
        samePwd: function (value) {
            var old = $('[name = oldPwd]').val().trim()
            if (old == value) {
                return '新密码不能与原密码相同'
            }
        },
        rePwd: function (value) {
            var newPwd = $('[name = newPwd]').val().trim()
            if (newPwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 上传密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        // console.log(data);
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/updatepwd',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, function () {
                    // 页面跳转到登录页
                    window.parent.location.href = '/login.html'
                })
            }


        })
    })
})