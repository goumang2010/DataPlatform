/**
 * @author yanglei
 * @date 20160401
 * @fileoverview 平台返利汇总
 */
var api = require("../../../base/main"),
    _ = require("lodash"),
    filter = require("../../../filters/platformRebate");

module.exports = (Router) => {
    Router = new api(Router,{
        router : "/platformRebate/platformOrderOne",
        modelName : ["Rebate"],
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        fixedParams(req, query, cb) {
            if(query.category_id) {
                req.models.ConfCategories.find({
                    id : query.category_id
                }, (err, data) => {
                    if(err) {
                        cb(err);
                    } else {
                        query['category_id_' + (data[0].level + 1)] = query.category_id;
                        delete query.category_id;
                        cb(null, query);
                    }
                });
            } else {
                cb(null, query);
            }
        },
        procedure : [{
            aggregate : "params",
            sum : ["unique_order_num", "unique_is_rebate_order_num",
                "fee", "is_rebate_fee", "unique_shop_num", "unique_is_rebate_shop_num",
                "unique_user_num", "unique_is_rebate_user_num",
                "merchandise_num", "is_rebate_merchandise_num",
                "unique_is_over_rebate_order_num", "is_over_rebate_order_amount",
                "unique_back_merchandise_num", "unique_is_rebate_back_merchandise_num",
                "back_merchandise_num", "is_rebate_back_merchandise_num",
                "unique_back_user_num", "unique_is_rebate_back_user_num",
                "back_merchandise_amount", "is_rebate_back_merchandise_amount"],
            get : ""
        }],
        platform : false,
        //date_picker_data: 1,
        filter(data) {
            return filter.platformOrderOne(data);
        },
        rows: [
            ["name", "order_count", "rebate_order_amount_count", "participate_seller_count",
                "participate_user_count", "productSku_num"],
            ["rebate_order_count",
                //"rebate_order_amount_count", "rebate_order_amount_actual_count",
                "rebate_amount_count"
                //, "rate"
            ],
            ["name", "spu_count", "sku_count", "refund_user_count", "refund_goods_amount_count"
                //"refund_goods_amount_actual_count"
            ]
        ],
        cols: [
            [{
                caption: "",
                type: "string"
            }, {
                caption: "订单数",
                type: "string"
            }, {
                caption: "订单总金额",
                type: "string"
            }, {
                caption: "商家数",
                type: "string"
            }, {
                caption: "用户数",
                type: "string"
            }, {
                caption: "商品件数",
                type: "string",
                help : "所有订单中，带返利的商品总件数，统计时间为订单生成时间"
            }],
            [{
                caption: "返利到账订单数",
                type: "string",
                help : "返利订单中已经返利到账的订单数，统计时间为订单返利到账时间"
            //}, {
            //    caption: "返利到账订单总金额",
            //    type: "string",
            //    help : "统计时间内所有已返利订单的成交金额，统计时间为订单返利到账时间"
            //}, {
            //    caption: "返利到账订单实付金额",
            //    type: "string",
            //    help : "统计时间内所有已返利订单的实际支付金额，统计时间为订单返利到账时间"
            }, {
                caption: "返利到账金额",
                type: "string",
                help : "返利订单中已返利总金额，统计时间为订单返利到账时间"
            //}, {
            //    caption: "返利比率",
            //    type: "string",
            //    help : "返利到账金额/返利到账订单实付金额"
            }],
            [{
                caption: "",
                type: "string"
            }, {
                caption: "退货商品数",
                type: "string"
            }, {
                caption: "退货商品件数",
                type: "string"
            }, {
                caption: "退货用户数",
                type: "string"
            }, {
                caption: "退货商品总金额",
                type: "string"
            //}, {
            //    caption: "实际退货金额",
            //    type: "string"
            }]
        ]
    });

    Router = new api(Router,{
        router : "/platformRebate/platformOrderTwe",
        modelName : [ "RebateOrderTredencyDetails", "TypeFlow" ],
        fixedParams(req, query, cb) {
            if(query.category_id) {
                req.models.ConfCategories.find({
                    id : query.category_id
                }, (err, data) => {
                    if(err) {
                        cb(err);
                    } else {
                        query['category_id_' + (data[0].level + 1)] = query.category_id;
                        delete query.category_id;
                        cb(null, query);
                    }
                });
            } else {
                cb(null, query);
            }
        },
        secondParams() {
            return {
                type : 1,
                status : 1
            };
        },
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        procedure : [{
            aggregate : {
                value : ["plan_type", "date"]
            },
            sum : ["unique_is_rebate_order_num", "is_rebate_fee",
                "is_rebate_merchandise_num"],
            groupBy : ["date"],
            get : ""
        }, false],
        platform : false,
        filter_select: [{
            title: '指标选择',
            filter_key: 'filter_key',
            groups: [{
                key: 'unique_is_rebate_order_num',
                value: '订单数'
            }, {
                key: 'is_rebate_fee',
                value: '订单总金额'
            }, {
                key: 'is_rebate_merchandise_num',
                value: '商品件数'
            }]
        }],
        filter(data, query, dates) {
            return filter.platformOrderTwe(data, query.filter_key, dates);
        }
    });

    Router = new api(Router,{
        router : "/platformRebate/platformOrderThree",
        modelName : [ "RebateTypeLevelDetails", "TypeFlow" ],
        fixedParams(req, query, cb) {
            if(query.category_id) {
                req.models.ConfCategories.find({
                    id : query.category_id
                }, (err, data) => {
                    if(err) {
                        cb(err);
                    } else {
                        query['category_id_' + (data[0].level + 1)] = query.category_id;
                        delete query.category_id;
                        cb(null, query);
                    }
                });
            } else {
                cb(null, query);
            }
        },
        secondParams() {
            return {
                type : 1,
                status : 1
            };
        },
        procedure : [{
            aggregate : {
                value : ["level", "rebate_level"]
            },
            sum : ["is_rebate_merchandise_num", "is_rebate_fee",
                "is_over_rebate_order_amount"],
            groupBy : ["level", "rebate_level"],
            get : ""
        }, false],
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        platform : false,
        filter_select: [{
            title: '指标选择',
            filter_key: 'filter_key',
            groups: [{
                key: 'is_rebate_merchandise_num',
                value: '商品件数'
            }, {
                key: 'is_rebate_fee',
                value: '商品总金额'
            }, {
                key: 'is_over_rebate_order_amount',
                value: '返利到账金额'
            }]
        }],
        filter(data, query, dates) {
            return filter.platformOrderThree(data, query.filter_key);
        }
    });

    Router = new api(Router,{
        router : "/platformRebate/platformOrderFour",
        modelName : [ "RebatetSheduleDetails", "TypeFlow" ],
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        fixedParams(req, query, cb) {
            if(query.category_id) {
                req.models.ConfCategories.find({
                    id : query.category_id
                }, (err, data) => {
                    if(err) {
                        cb(err);
                    } else {
                        query['category_id_' + (data[0].level + 1)] = query.category_id;
                        delete query.category_id;
                        find(req, query, cb);
                    }
                });
            } else {
                find(req, query, cb);
            }

            function find(req, query, cb) {
                req.models.TypeFlow.find({
                    type : 1,
                    status : 1
                }, (err, data) => {
                    if(err) {
                        cb(err);
                    } else {
                        var user_party = _.uniq(_.pluck(data, "type_code"));
                        query.plan_type = user_party;
                        cb(null, query);
                    }
                });
            }
        },
        secondParams() {
            return {
                type : 1,
                status : 1
            };
        },
        procedure : [{
            aggregate : {
                value : ["plan_type"]
            },
            sum : ["unique_is_rebate_merchandise_num", "is_rebate_fee",
                "is_over_rebate_order_amount"],
            groupBy : ["plan_type"],
            get : ""
        }, false],
        platform : false,
        filter_select: [{
            title: '指标选择',
            filter_key: 'filter_key',
            groups: [{
                key: 'unique_is_rebate_merchandise_num',
                value: '商品件数'
            }, {
                key: 'is_rebate_fee',
                value: '商品总金额'
            }, {
                key: 'is_over_rebate_order_amount',
                value: '返利到账金额'
            }]
        }],
        filter(data, query, dates) {
            return filter.platformOrderFour(data, query.filter_key);
        }
    });

    Router = new api(Router,{
        router : "/platformRebate/platformOrderFive",
        modelName : [ "RebatetSheduleDetails", "TypeFlow" ],
        excel_export : true,
        platform : false,
        paging : [true, false],
        showDayUnit : true,
        date_picker_data : 1,
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        secondParams() {
            return {
                type : 1,
                status : 1
            };
        },
        selectFilter(req, cb) {
            req.models.TypeFlow.find({
                type : 1,
                status : 1
            }, (err, data) => {
                if(err) {
                    cb(err);
                } else {
                    var filter_select = [],
                        obj = {},
                        user_party = _.uniq(_.pluck(data, "type_code"));
                    filter_select.push({
                        title: '使用方',
                        filter_key: 'plan_type',
                        groups : [
                            {
                                key: user_party,
                                value: '全部使用方',
                                cell: {
                                    title: '关联流程',
                                    filter_key : 'rebate_type',
                                    groups : [{
                                        key: '',
                                        value: '全部相关流程'
                                    }]
                                }
                            }
                        ]
                    });
                    for(var key of user_party) {
                        obj[key] = {
                            value: '',
                            cell: {
                                title: '关联流程',
                                filter_key : 'rebate_type',
                                groups : [{
                                    key: '',
                                    value: '全部相关流程'
                                }]
                            }
                        };
                    }
                    for(key of data) {
                        obj[key.type_code].value = key.type_name;
                        obj[key.type_code].key = key.type_code;
                        obj[key.type_code].cell.groups.push({
                            key : key.flow_code,
                            value : key.flow_name
                        });
                    }
                    for(key in obj) {
                        filter_select[0].groups.push(obj[key]);
                    }
                    cb(null, filter_select);
                }
            });
        },
        filter(data, query) {
            return filter.platformOrderFive(data, query.page);
        },
        rows : [
            [ "id", "plan_name", "plan_type", "validscope_time", "rebate_type", "level", "unique_is_rebate_shop_num",
                "unique_is_rebate_merchandise_num", "unique_is_rebate_user_num", "order_rate", "price_rate",
                "is_over_rebate_order_amount" ]
        ],
        cols : [
            [
                {
                    caption : "序号",
                    type : "number"
                }, {
                    caption : "返利计划名称",
                    type : "string"
                }, {
                    caption : "使用方",
                    type : "string"
                }, {
                    caption : "有效期",
                    type : "string"
                }, {
                    caption : "相关流程",
                    type : "string"
                }, {
                    caption : "层级",
                    type : "string"
                }, {
                    caption : "参与商家数",
                    type : "number"
                }, {
                    caption : "参与商品数",
                    type : "number"
                }, {
                    caption : "参与用户数",
                    type : "number"
                }, {
                    caption : "新增订单数/订单总数",
                    type : "string"
                }, {
                    caption : "新增订单金额/订单总金额",
                    type : "string"
                }, {
                    caption : "返利到账金额",
                    type : "number",
                help : "返利订单中已返利总金额，统计时间为订单返利到账时间"
                }
            ]
        ]
    });

    return Router;
};