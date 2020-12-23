$.ajaxPrefilter(function (options) {
    
    //判断有权限的接口设置请求头
    //判断接口地址是否有/my/
    if (options.url.indexOf('/my/') !== -1) {
        //设置请求头
       options.headers = {
            Authorization:localStorage.getItem('token')
        }
        // console.log();
    }
})