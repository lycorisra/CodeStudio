/**
 * Created by lixun on 16/9/4.
 */

module.exports = {

    env_gzip: true,

    session_switch: true,
    session_store: 'redis',
    session_expires: 24 * 60 * 60,
    session_redis_host: '10.172.164.170',
    session_redis_port: 6380,
    session_redis_pass: '',
    session_redis_db: 1,
    session_redis_prefix: 'yitu-session:',

    log_print_to_console: false,

    global: {
        adminHost: 'http://admin.egpic.cn/',
        bbsHost: 'http://bbs.egpic.cn/',
        qiniuHost: 'http://imageprod.egpic.cn/',
        fontUriHost: 'http://fontprod.egpic.cn/',
        qqLoginCallbackHost: 'http://www.egpic.cn/',
        qqLoginAppId: '101388198',
        getPCAuthCode: "https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101388198&response_type=token&scope=all&redirect_uri=",
        wxLoginAppId: "wxde0c9643f19694f2",
        getWXAuthCode: "https://open.weixin.qq.com/connect/qrconnect?appid=wxde0c9643f19694f2&response_type=code&scope=snsapi_login&redirect_uri=",
        wbLoginAppId: "3135994178",
        getWBAuthCode: "https://api.weibo.com/oauth2/authorize?client_id=3135994178&response_type=code&redirect_uri=",
        baiduTJ: "https://hm.baidu.com/hm.js?44b83d2772208ae7a899026152691442",

        discuss: "http://bbs.egpic.cn/forum-43-1.html",
        course: "http://bbs.egpic.cn/forum-2-1.html",
        feedBack: "http://bbs.egpic.cn/forum-44-1.html"
    },

    private: {
        bbsCookie: {
            appId: 2,           //discuz端应用编号
            apiUrl: 'http://bbs.egpic.cn/uc_server/index.php',
            authKey: 'ZkAkygWcGTLi92jFWgJJMdlF4G3j6pLv', //配置加密密钥，由dz后端提供
            cachePrefix: 'Jfjt_', //配置同步cookie前缀，由dz后端提供
            release: '20110501', //配置dz ucenter,固定值，不需要更改
            inajax: 2, //dz请求相关参数，固定值，不需要更改
            agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3135.4 Safari/537.36' //userAgent,必须设置，具体值随意
        },
        socketNotice:{
            tokenExpire:300,
            authKey:'XXTYcoufymXFx7CMHgdSgw40rHKUrFRz',
            host:"http://123.57.156.203:6300"
        }
    }

};