'use strict';

var utils = {};

utils.formatDate = function(date, fmt) {
	var o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

utils.isInObj = function(source, target) {
	for (var item in target) {
		if (item === source) {
			return true;
		}
	}
	return false;
}
utils.isInArry = function(source, target) {
	for (var item of target) {
		if (item === source) {
			return true;
		}
	}
	return false;
}

utils.uniqueArray = function(a) {
	var hash = {},
		len = a.length,
		result = [];

	for (var i = 0; i < len; i++) {
		if (!hash[a[i]]) {
			hash[a[i]] = true;
			result.push(a[i]);
		}
	}
	return result;
}

utils.getObjLen = function(obj) {
	var _count = 0;
	for (var item in obj) {
		_count += 1;
	}
	return _count;
}

utils.parseUrlQuery = function(fullUrl) {
	var _cur = {};
	if (fullUrl.indexOf('?') > -1) {
		var queryStr = fullUrl.match(/\?(.*)/)[1];
		var curArr = queryStr.split('&');
		for (let i = 0; i < curArr.length; i++) {
			_cur[curArr[i].split('=')[0]] = curArr[i].split('=')[1];
		}
	}
	return _cur;
}

utils.wait = (str , callback , time) => {
	let times = time || 300;
	let value = eval(str);
	if(value){
		return callback && callback();
	}else{
		setTimeout(()=>{
			return utils.wait(str , callback , time);
		} , times);
	}
}

utils.convertDecimal = (num) => {
    try {
		num = num.trim()
        if (!isNaN(parseInt(num))) {
            let arr = num.split('.')
            if (arr.length === 2) {
                let integer = arr[0]
                if (integer.length > 3) {
                    arr[0] = utils.insertChar(integer)
					return arr.join('.')
                }
            }
        }
        return num
    } catch (e) {
        console.error(e)
        return num
    }
}

utils.insertChar = (str, interval=3, char=',') => {
    let arr = str.split('')
    let index = 0
    for (let i= arr.length-1;i>0;i--) {
        if (++index%interval === 0) {
            arr.splice(i, 0, char)
        }
    }
    return arr.join('')
}

module.exports = utils;
