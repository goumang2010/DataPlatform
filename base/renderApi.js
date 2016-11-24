/**
 * @author yanglei
 * @date 20160325
 * @fileoverview 统一跳转页面
 */
var utils = require("../utils"),
    _ = require("lodash"),
    cache = require("../utils/cache"),
    config = require("../config"),
    cacheTime = 1;

function renderApi(Router, options) {
    var defaultOption = utils.mixin({
        //路由
        path: "",
        //跳转页面
        view: "main",
        //重定向路由
        router : "/",
        //下拉框表
        modelName: "Configure",
        //页面标题
        name: "",
        //下拉框初始化，在页面中的属性名
        defaultRender: [{
            key: "platform",
            value: "platform"
        }, {
            key: "version",
            value: "version"
        }, {
            key: "channel",
            value: "channel"
        }, {
            key: "quan",
            value: "coupon"
        }]
    }, options);
    utils.mixin(this, defaultOption);
    this.setRouter(Router);

    return Router;
}

renderApi.prototype = {
    constructor: renderApi,
    _sendData(req, res, next) {
        this._findData(req, res, next);
        // cache.cacheGet(this.modelName, (err, types) => {
        //     if (!err) {
        //         if (types) {
        //             this._renderData(req, res, {
        //                 types: types
        //             });
        //         } else {
        //             this._findData(req, res, next);
        //         }
        //     } else {
        //         next(err);
        //     }
        // });
    },
    _findData(req, res, next) {
        var types = {};
        this._renderData(req, res, {
            types: types
        });
    },
    _renderData(req, res, dataParams) {
        var pageAll = {},
            page = {};
            // limited = req.session.userInfo.limited;
            // console.log(config.limit);
        for(var key in config.limit) {
            var limit = config.limit[key];
            //if(limited[key]) {
                for(var value of limit.path) {
                    var path = limit.path[value];
                    if(path) {
                        page[path.path] = {
                            id: key,
                            pageTitle : path.name,
                            defaultData : path.defaultData
                        };
                    }
                }
                if(limit.routers) {
                    for(var k of limit.routers) {
                        page[k.path] = {
                            id: key,
                            pageTitle : k.name,
                            defaultData : k.defaultData
                        };
                    }
                }
           // }
            if(limit.display) {
                pageAll[key] = {
                    name : limit.name,
                    path : limit.path
                };
            }
        };
        res.render(this.view, {
            //pageTitle: this.name,
            drop_down_default_data: dataParams.types,
            pageAll : pageAll,
            page : page,
            userInfo: req.session.userInfo
        });
    },
    setRouter(Router) {
        Router.get(this.router, this._sendData.bind(this));
        return Router;
    }
};

module.exports = renderApi;
