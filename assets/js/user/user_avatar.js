$(function () {
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)




    //点击上传按钮显示上传文件 
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function () {
        // console.log($('#file')[0].files);
        var fileList = $('#file')[0].files
        if (fileList.length <= 0) {
            return layer.msg('请选择文件')
        }
        var file = fileList[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 点击确认上传文件
    $('#btnUpload').click(function () {
        //获取用户上传
    var files = $('#file')[0].files
    //判断用户是否选择了文件
    if(files.length<=0){
        return layer.msg('选择文件')
        }
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
        })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // console.log($image);
// 上传 调用ajax
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success:function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, function () {
                    window.parent.getUserInfo()
                })
            }
        })
    })

})



