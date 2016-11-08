var store = require('../../../store/store.js');
var actions = require('../../../store/actions.js');
var $ = require('jQuery');
const baseurl = 'http://10.69.20.55:8080/bomber-pie';
// const baseurl = 'http://10.69.112.146:38080/bomber-pie'

$.support.cors = true;


function filterArgs(data, args) {
	var newdata = {};
	for(var key of args) {
		// 不允许空字符串,0值
		if(data[key]) {
			newdata[key] = data[key];
		}
	}
	return newdata;
}

function buildAjax(url, data, type = 'get') {
	return new Promise(function(s, j){
		$.ajax({
			url: baseurl + url,
			type,
			dataType: 'JSON',
			data,
			success(data) {
            	s(data);
        	},
			error(xhr, status, error) {
                j('请求失败：' + status);
        	}
		});
	});
}

function extractResult(res) {
	return new Promise(function(s, j){
		if(res.code !== '200' || res.iserror !== '0') {
			j('获取埋点信息失败：' + res.msg);
		}
		var data;
		if (res && (data = res.data) && (data = data.result)) {
			s(data);
		} else {
            j('获取的埋点信息为空');
		}
	});
}
function errHandler(err) {
	var msg = '请求过程中失败：' + err.toString();
	actions.alert(store, {
        show: true,
        msg,
        type: 'danger'
    });
    // stop the process
    return Promise.reject(msg);
}

var api = {
	// {pageUrl, selector, platform, pointId, matchUrlId}
	getBp(data) {
		return buildAjax('/point', filterArgs(data,['pageUrl', 'selector', 'platform', 'pointId'])).then(extractResult, errHandler).catch(errHandler);
	},
	// {pageUrl, selector, pointName, platform, pointId, matchUrlId, pattern, publicParam, privateParam}
	updateBp(data) {
		return buildAjax('/point', data, 'put').then(extractResult).catch(errHandler).then(function(res) {
			actions.alert(store, {
		        show: true,
		        msg: '更新成功',
		        type: 'success'
		    });
		});
	},
	// {pageUrl, selector, pointName, platform, pointId, matchUrlId, pattern, publicParam, privateParam}
	saveBp(data) {
		return buildAjax('/point', data, 'post').then(extractResult).catch(errHandler).then(function(res) {
			actions.alert(store, {
		        show: true,
		        msg: '保存成功',
		        type: 'success'
		    });
		});
	},
	// {pointId, matchUrlId}
	deleteBp(data) {
		return buildAjax('/point', filterArgs(data,['pointId', 'matchUrlId']), 'delete').then(extractResult).catch(errHandler).then(function(res) {
			actions.alert(store, {
		        show: true,
		        msg: '删除成功',
		        type: 'success'
		    });
		});
	},
	// useless: selector
	// {pageUrl, platform, pointName, page, size}
	listBps(data){
				return Promise.resolve({
		    "data": {
		        "total": 20,
		        "result": [{
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        }, 
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 50,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>2",
		            "pointName": "埋点2",
		            "pointParam": "uid=1",
		            "createTime": 1478239758000,
		            "updateTime": 1478239758000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "1"
		        },
		        {
		            "id": 51,
		            "pageUrl": "https://mall.gomeplus.com/item/2016-11042.html",
		            "selector": "<div/>3",
		            "pointName": "埋点4",
		            "pointParam": "uid=1&aid=1&cid=2016-11042&bid=2",
		            "createTime": 1478239778000,
		            "updateTime": 1478240238000,
		            "platform": "H5",
		            "isActive": "1",
		            "uniquePoint": "0"
		        }]
		    },
		    "code": "200",
		    "msg": "",
		    "iserror": "0"
		}).then(function(res) {
			if(res.code !== '200' || res.iserror !== '0') {
				return Promise.reject('获取埋点信息失败：' + res.msg);
			}
			var data;
			if (res && (data = res.data) && (data = data.result)) {
				return {
					data,
					total: res.data.total
				}
			} else {
	            return Promise.reject('获取的埋点信息为空');
			}
		}).catch(errHandler);
		// return buildAjax('/pointList', data).then(function(res) {
		// 	if(res.code !== '200' || res.iserror !== '0') {
		// 		return Promise.reject('获取埋点信息失败：' + res.msg);
		// 	}
		// 	var data;
		// 	if (res && (data = res.data) && (data = data.result)) {
		// 		return {
		// 			data,
		// 			total: res.data.total
		// 		}
		// 	} else {
	 //            return Promise.reject('获取的埋点信息为空');
		// 	}
		// }).catch(errHandler);
	}
}
module.exports = api;