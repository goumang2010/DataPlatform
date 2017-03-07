/**
 * @author yanglei
 * @date 20160325
 * @fileoverview 统一跳转页面
 */
var utils = require("../utils"),
    _ = require("lodash"),
    cache = require("../utils/cache"),
    config = require("../config/config"),
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
            page = {},
            limited = req.session.userInfo.limited,
            sub_pages = req.session.userInfo.sub_pages;
        for(var key in config.limit) {
            var limit = config.limit[key];
            if(limited[key]) {
                let obj = {};
                for(let k of limit.path) {
                    obj[k.id] = k;
                }
                for(var value of limited[key]) {
                    var path = obj[value];
                    if(path) {
                        let userSubs;
                        let subPages = path.subPages || [] ;
                        sub_pages && (userSubs = sub_pages[key]) && (userSubs = userSubs[value]);
                        userSubs = userSubs || [];
                        let banSubPages = subPages.filter(x => !userSubs.includes(x.id.toString()));
                        page[path.path] = {
                            id: path.id.toString(),
                            router: false,
                            f_id: key,
                            pageTitle : path.name,
                            banSubPages,
                            defaultData : path.defaultData
                        };
                    }
                }
                if(limit.routers) {
                    for(var k of limit.routers) {
                        page[k.path] = {
                            id: k.id && k.id.toString(),
                            router: true,
                            f_id: key,
                            pageTitle : k.name,
                            defaultData : k.defaultData
                        };
                    }
                }
           // }
            if(limit.display) {
                pageAll[key] = {
                    id : limit.id,
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
