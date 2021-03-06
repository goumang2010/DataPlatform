/**
 * @author yanglei
 * @date 20160414
 * @fileoverview 优惠券信息
 */
var _ = require("lodash"),
    util = require("../../utils");

module.exports = {
    allOne(data) {
        let source = data.first.data,
            obj = {};
        for(let i = 0; i < source.length; i++) {
            obj[data.rows[0][i]] = source[i] || 0;
        }

        return util.toTable([[obj]], data.rows, data.cols);
    },
    allTwo(data, query, dates) {
        let source = data.first.data[0],
            newData = {},
            filter_name = {
                active_pv : "活动页PV",
                register : "新增注册",
                coupon_get_num : "优惠卷领取数量",
                coupon_use_num : "优惠卷使用数量",
                order_num : "订单总量",
                pay_num : "支付总量",
                order_num_money : "订单总金额",
                pay_num_money : "实际支付总金额"
            },
            type,
            map,
            filter_keys = query.filter_key.split("-"),
            filter_type = query.filter_type;

        for(let key of filter_keys) {
            map[key] = filter_name[key];
        }

        if(filter_type === "date") {
            type = "line";
            for(let date of dates) {
                newData[date] = {};
                for(let key of filter_keys) {
                    newData[date][key] = 0;
                }
            }

            for(let item of source) {
                let date = util.getDate(item.date);
                for(let key of filter_keys) {
                    newData[date][key] += item[key];
                }
            }
        } else {
            type = "bar";
        }

        return util.toTable([source], data.rows, data.cols, [count]);
    }
};