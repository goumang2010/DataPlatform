/**
 * @author yanglei
 * @date 20160407
 * @fileoverview 平台返利汇总
 */
var _ = require("lodash"),
    moment = require("moment"),
    util = require("../utils");

module.exports = {
    platformOrderOne(data) {
        var source = data.data,
            orderSource = data.orderData,
            oneOne = 0,
            oneTwo = 0,
            oneThree = 0,
            oneFour = 0,
            oneFive = 0,
            one = [],
            two = [],
            three = [],
            objOne = {
                name: "返利订单",
                order_count: 0,
                rebate_order_amount_count: 0,
                participate_seller_count: 0,
                participate_user_count: 0,
                participate_goods_count: 0
            },
            objTwo = {
                rebate_order_count: 0,
                rebate_order_amount_count: 0,
                rebate_order_amount_actual_count: 0,
                rebate_amount_count: 0
            },
            objThree = {
                name: "返利订单",
                spu_count: 0,
                total_spu_num: 0,
                sku_count: 0,
                total_sku_num: 0,
                refund_user_count: 0,
                total_user_num: 0,
                refund_goods_amount_count: 0,
                total_amount: 0,
                refund_goods_amount_actual_count: 0,
                total_amount_actual: 0
            };
        for (var key of source) {
            oneOne = key.total_order_num;
            oneTwo = key.total_order_amount;
            oneThree = key.total_shop_num;
            oneFour = key.participate_user_count;
            oneFive = key.total_product_sku_num;
            objOne.order_count += key.order_count;
            objOne.rebate_order_amount_count += key.rebate_order_amount_count;
            objOne.participate_seller_count += key.participate_seller_count;
            objOne.participate_user_count += key.participate_user_count;
            objOne.participate_goods_count += key.participate_goods_count;
            objTwo.rebate_order_count += key.rebate_order_count;
            objTwo.rebate_order_amount_count += key.rebate_order_amount_count;
            objTwo.rebate_order_amount_actual_count += key.rebate_order_amount_actual_count;
            objTwo.rebate_amount_count += key.rebate_amount_count;
        }
        for (var key of orderSource) {
            objThree.spu_count += key.spu_count;
            objThree.sku_count += key.sku_count;
            objThree.refund_user_count += key.refund_user_count;
            objThree.refund_goods_amount_count += key.refund_goods_amount_count;
            objThree.refund_goods_amount_actual_count += key.refund_goods_amount_actual_count;
            objThree.total_spu_num = key.total_spu_num;
            objThree.total_sku_num = key.total_sku_num;
            objThree.total_user_num = key.total_user_num;
            objThree.total_amount = key.total_amount;
            objThree.total_amount_actual = key.total_amount_actual;
        }
        one.push(objOne);
        one.push({
            name: "总占比",
            order_count: util.toFixed(objOne.order_count, oneOne),
            rebate_order_amount_count: util.toFixed(objOne.rebate_order_amount_count, oneTwo),
            participate_seller_count: util.toFixed(objOne.participate_seller_count, oneThree),
            participate_user_count: util.toFixed(objOne.participate_user_count, oneFour),
            participate_goods_count: util.toFixed(objOne.participate_goods_count, oneFive)
        });
        objTwo.rate = util.toFixed(objTwo.rebate_amount_count, objTwo.rebate_order_amount_actual_count);
        two.push(objTwo);
        three.push(objThree);
        three.push({
            name: "返利退货订单占比",
            spu_count: util.toFixed(objThree.spu_count, objThree.total_spu_num),
            sku_count: util.toFixed(objThree.sku_count, objThree.total_sku_num),
            refund_user_count: util.toFixed(objThree.refund_user_count, objThree.total_user_num),
            refund_goods_amount_count: util.toFixed(objThree.refund_goods_amount_count, objThree.total_amount),
            refund_goods_amount_actual_count: util.toFixed(objThree.refund_goods_amount_actual_count, objThree.total_amount_actual)
        });
        return util.toTable([one, two, three], data.rows, data.cols);
    },










    inviteRegisterAndEnterOne(data) {
        var source = data.data;
        var resultData = [];
        var _current = {};
        _current.rows = data.rows;
        _current.cols = data.cols;
        _current.data = [];
        var one = {
            "rebate_plan_count": 0,
            "participate_user_count": 0,
            "registered_count": 0,
            "rebate_amount_count": 0,
        }
        for(var item of source){
            one.rebate_plan_count += item.rebate_plan_count;
            one.participate_user_count += item.participate_user_count;
            one.registered_count += item.registered_count;
            one.rebate_amount_count += item.rebate_amount_count;
        }
        _current.data.push({
            "rebate_plan_count": one.rebate_plan_count,
            "participate_user_count": one.participate_user_count,
            "registered_count": one.registered_count,
            "registered_rate": util.toFixed(one.registered_count, one.participate_user_count),
            "rebate_amount_count": one.rebate_amount_count
        });
        resultData.push(_current);
        return resultData;
    },
    inviteRegisterAndEnterTwo() {
        return '123'
    },
    inviteRegisterAndEnterThree() {
        return '123'
    },
    inviteRegisterAndEnterFour() {
        return '123'
    },




};
