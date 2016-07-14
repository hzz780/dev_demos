// 版本相关
function getEnvInfo() {
    var ua = navigator.userAgent;
    var uaInfo = {
        isMobile: !!ua.match(/mobile/i),
        // isPC: !isMobile,
        isIphone: ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isIOS: ua.match(/iphone|ipad|ipod/i),
        isAndroid: ua.match(/android/i),
        isUC: ua.match(/UCBrowser/gi),
        isQQBrowser: ua.match(/MQQBrowser/gi),
        isBDBox: ua.match(/baiduboxapp/gi),
        isWeixin: ua.match(/micromessenger/gi), // 微信
        // 当前的通过这个ua判断是否是地图是不准确的。
        // 但是这里使用范围未知，具体对应地图的逻辑就在各业务处标注注释并且重写了
        // 如果还需要有地图下的特殊策略的话 现在判断是否为地图可以通过这个条件：
        // O2O框架的版本，2.2及以下版本一定是地图，2.3及以上版本有BoxBaiduRuntimeO2OZone的是框、否则也是地图
        isMap: ua.match(/BaiduRuntimeO2OZone/i),
        isSafari: ua.match(/Safari/i)
    };
    // alert(ua);
    var getBDBoxVersion = function () {
        if (uaInfo.isBDBox) {
            var boxdetail = navigator.userAgent.match(/baiduboxapp\/([\d.-_]*)/i);
            var version = boxdetail && boxdetail[1];
            if (version) {
                boxdetail = version.match(/[0-9]\.[^_]*/);
                version = boxdetail && boxdetail[0];

                if (version) {
                    var verNums = version.split('.');
                    // iphone 下需要翻转版本号
                    if (uaInfo.isIphone) {
                        verNums = verNums.reverse();
                    }

                    return {
                        mainVersion: parseInt(verNums[0], 10),
                        subVersion: parseInt(verNums[1], 10),
                        version: version
                    };
                }

            }
        }
    };
    // getBDBoxVersion() end
    return {
        uaInfo: uaInfo,
        getBDBoxVersion: getBDBoxVersion
    };
}
// END getEnvInfo

// 获取页面传来的参数
function getParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return (r[2]);
    }
    return null;
}
// END getParam

function getParamFromString(name, string) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = string.match(reg);
    if (r !== null) {
        return (r[2]);
    }
    return null;
}

// 给url添加参数
function addUrlPara(url, name, value) {
    var currentUrl = url;
    if (/\?/g.test(currentUrl)) {
        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
            currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + '=' + value);
        } else {
            currentUrl += '&' + name + '=' + value;
        }
    } else {
        currentUrl += '?' + name + '=' + value;
    }
    if (currentUrl.split('#')[1]) {
        return currentUrl + '#' + window.location.href.split('#')[1];
    } else {
        return currentUrl;
    }
}

// 数字格式化
function numFormat(num) {
    var num = parseInt(num, 10);
    var numTemp = '';
    if (num >= 10000) {
        numTemp = Math.floor(num / 1000) / 10 + '万';
        return numTemp;
    } else {
        return num;
    }
}