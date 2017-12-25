/**
 * Created by lixun on 16/9/4.
 */

module.exports = {

    env_gzip: true,

    session_switch: true,
    session_store: 'redis',
    session_expires: 24 * 60 * 60,
    session_redis_host: '127.0.0.1',
    session_redis_port: 6379,
    session_redis_pass: '',
    session_redis_db: 1,
    session_redis_prefix: 'yitu-session-test:',

    log_print_to_console: false,

    global: {
        adminHost: 'http://admin-test.egpic.cn/',
        bbsHost: 'http://bbs-test.egpic.cn/',
        //qiniuHost: 'http://testimage.egpic.cn/',
        qiniuHost: 'http://test-imageprod.egpic.cn/',
        //fontUriHost: 'http://testfont.egpic.cn/',
        fontUriHost: 'http://test-fontprod.egpic.cn/',
        qqLoginCallbackHost: 'http://test.egpic.cn/',
        qqLoginAppId: '101383259',
        getPCAuthCode: "https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101383259&response_type=token&scope=all&redirect_uri=",
        wxLoginAppId: "wxc88722adb9219465",
        getWXAuthCode: "https://open.weixin.qq.com/connect/qrconnect?appid=wxc88722adb9219465&response_type=code&scope=snsapi_login&redirect_uri=",
        wbLoginAppId: "3780306259",
        getWBAuthCode: "https://api.weibo.com/oauth2/authorize?client_id=3780306259&response_type=code&redirect_uri=",
        baiduTJ: "https://hm.baidu.com/hm.js?d75d6eaa60b8cfc7ac6eac6ff369abd9",

        discuss: "http://bbs-test.egpic.cn/forum.php?mod=forumdisplay&fid=43",
        course: "http://bbs-test.egpic.cn/forum.php?mod=forumdisplay&fid=2",
        feedBack: "http://bbs-test.egpic.cn/forum.php?mod=forumdisplay&fid=44"
    },

    private: {
        bbsCookie: {
            appId: 2,           //discuz端应用编号
            apiUrl: 'http://forum.egpic.cn/uc_server/index.php',
            authKey: 'JwysGJs38ve8VzybPQ7I87bzGDlfMg6JOpJnvxTS', //配置加密密钥，由dz后端提供
            cachePrefix: 'Jfjt_', //配置同步cookie前缀，由dz后端提供
            release: '20110501', //配置dz ucenter,固定值，不需要更改
            inajax: 2, //dz请求相关参数，固定值，不需要更改
            agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3135.4 Safari/537.36' //userAgent,必须设置，具体值随意
        },
        socketNotice:{
            tokenExpire:300,
            authKey:'XXTYcoufymXFx7CMHgdSgw40rHKUrFRz',
            host:"http://123.57.72.127:6300"
        }
    }
};