/**
 * author@Mr.He
 * content@20161103
 * 交易面板过滤函数
 */

var util = require("../../utils"),
    moment = require("moment");

module.exports = {
    //交易汇总
    tradePanelOne(data , query , dates) {

        let source = data.first.data[0];
        let rows   = ["access_user" , "order_user" , "order_num" , "order_sum" ,"Man_price" , "pay_user" , "pay_num" , "pay_sum"];
        let Cols = [
            [{
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }]
        ];

        let result = {};
        for(let key of rows){
            result[key] = 0;
        }

        let All_pay_sum = 0 , All_pay_user = 0;
        for(let item of source){
            for(let key of rows){
                result[key] += item[key];
                result[key] = util.numberLeave(result[key] , 2);
            }
            All_pay_sum += item.pay_sum;
            All_pay_user +=item.pay_user;
        }

        result.Man_price = util.numberLeave(All_pay_sum / All_pay_user , 2);

        let OneData = {
            "access_user" : "访客数 : " + result.access_user,
            "order_user"  : "下单人数 : " + result.order_user,
            "order_num"   : "下单总量 : " + result.order_num,
            "order_sum"   : "下单金额 : " + result.order_sum
        }

        let TwoData = {
            "access_user" : "客单价 : " + result.Man_price,
            "order_user"  : "支付人数 : " + result.pay_user,
            "order_num"   : "支付总量 : " + result.pay_num,
            "order_sum"   : "支付金额 : " + result.pay_sum
        }

        return util.toTable([[OneData , TwoData]], data.rows, Cols , null , [true]);
    },

    //交易商品汇总
    tradePanelTwo(data, query, dates) {
        let source = data.first.data[0];
        let result = {};
        for(let key of data.rows[0]){
            if(key == "operating"){
                continue;
            }else{
                result[key] = 0;
            }
        }

        for(let item of source){
            for(let key of data.rows[0]){
                if(key == "operating") continue;
                result[key] += item[key];
            }
        }

        let Cols = [{
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: ""
            }];

        let OneData = {
            "access_user" : "浏览商品数 : " + result.access_user,
            "order_user"  : "下单商品件数 : " + result.order_user,
            "order_num"   : "支付商品件数 : " + result.order_num,
            "operating"   : `<button class='btn btn-info' url_detail='/achievements/tradePanelTwo_add'>趋势</button>`
        }

        return util.toTable([[OneData]], data.rows, [Cols] , null , [true]);
    },
    //趋势分析补充
    tradePanelTwo_add(data , query , dates){
        let source = data.first.data[0],
            count  = 1;
        let result = {};
        let map = {
            "access_user" : "浏览商品数",
            "order_user": "下单商品件数",
            "order_num": "支付商品件数"
        }
        for(let date of dates){
            result[date] = {
                "access_user" : 0,
                "order_user"  : 0,
                "order_num"   : 0
            }
        }

        for(let item of source){
            item.date = util.getDate(item.date);
            for(let key in result[item.date]){
                result[item.date][key] += item[key]
            }
        }

        if(source.length == 0){
            //没有数据时让表出来
            source[0] = {
                "date" : "查询时间段无数据",
                "access_user" : 0,
                "order_user"  : 0,
                "order_num"   : 0
            }
            count = 1;
        }

        let out = util.toTable([source], data.rows, data.cols , [count]);
        return [out[0] , {
            type : "line",
            map : map,
            data : result,
            config: { // 配置信息
                stack: false  // 图的堆叠
            },
            default : true  //默认展示图表
        }];
    },


    //支付方式汇总
    tradePanelThree(data, query, dates) {
        let source = data.first.data[0];
        let result = {};

        let Type = [];
        for(let item of source){
            if(Type.indexOf(item.order_channel) < 0 && item.order_channel.toUpperCase() != "ALL"){
                Type.push(item.order_channel);
                result[item.order_channel] = 0;
            }
        }
        result.operating = `<button class='btn btn-info' url_detail='/achievements/tradePanelThree_add'>趋势</button>`;

        for(let item of source){
            if(result[item.order_channel] != undefined){
                result[item.order_channel] += item.pay_num;
            }
        }

        data.rows[0] = [];
        data.cols[0] = [];
        let oneData = {};
        for(let key in result){
            data.cols[0].push({caption:"" , type:"string"});
            data.rows[0].push(key);
            if(key == "operating"){
                oneData[key] = result[key];
            }else{
                oneData[key] = key + " : " +result[key];
            }
        }

        return util.toTable([[oneData]], data.rows, data.cols , null , [true]);
    },
    //支付方式汇总--补充
    tradePanelThree_add(data , query , dates){
        let source = data.first.data[0];
          /*  Result = [],
            count  = data.first.count > 20 ? 20 : (data.first.count ? data.first.count : 1);
        let result = {};
        let map = {
            "all_pay_num" : "总支付笔数",
            "aliy_pay": "支付宝支付笔数",
            "weixin_pay": "微信支付笔数",
            "other_pay" : "其它支付笔数"
        }
        for(let date of dates){
            result[date] = {
                "all_pay_num" : 0,
                "aliy_pay"    : 0,
                "weixin_pay"  : 0,
                "other_pay"   : 0
            }
        }

        for(let item of source){
            item.date = util.getDate(item.date);
            switch(item.order_channel){
                case "ALL":
                    result[item.date].all_pay_num += item.pay_num;
                    break;
                case "微信":
                    result[item.date].aliy_pay += item.pay_num;
                    break;
                case "支付宝":
                    result[item.date].weixin_pay += item.pay_num;
                    break;
                case "其它":
                    result[item.date].other_pay += item.pay_num;
                    break;
            }
        }*/


        let Type = [];
        for(let item of source){
            item.date = util.getDate(item.date);
            if(Type.indexOf(item.order_channel) < 0 && item.order_channel.toUpperCase() != "ALL"){
                Type.push(item.order_channel);
            }
        }

        let result = {};
        dates.reverse();
        for(let date of dates){
            result[date] = {};
            for(let key of Type){
                result[date][key] = 0;
            }
        }

        for(let item of source){
            if(result[item.date][item.order_channel] != undefined){
                result[item.date][item.order_channel] += item.pay_num;
            }
        }

        let map = {};
        data.rows[0] = ["date"].concat(Type);
        data.cols[0] = [{"caption":"日期",type:"date"}];
        for(let key of Type){
            map[key] = key;
            let obj = {caption:key , type:"number"};
            data.cols[0].push(obj);
        }

        let TableSource = [];
        for(let key in result){
            let obj = {};
            for(let n in result[key]){
                obj["date"] = key;
                obj[n] = result[key][n];
            }
            TableSource.push(obj);
        }

        
        let out = util.toTable([TableSource], data.rows, data.cols , [1]);
        return [out[0] , {
            type : "line",
            map : map,
            data : result,
            config: { // 配置信息
                stack: false  // 图的堆叠
            },
            default: true
        }];
    },
   


    //国美币汇总
    tradePanelFour(data, query, dates) {

        let source = data.first.data[0];
        let result = {};
        for(let key of data.rows[0]){
            if(key == "operating"){
                result[key] = `<button class='btn btn-info' url_detail='/achievements/tradePanelFour_add'>趋势</button>`;
            }else{
                result[key] = 0;
            }
        }

        for(let item of source){
            for(let key of data.rows[0]){
                if(key == "operating") continue;
                result[key] += item[key];
                result[key] = util.numberLeave(result[key] , 2);
            }
        }

        let Cols = [{
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: ""
            }];

        let oneData = {
            "newadd_guomeibi" : "新增国美币 : " + result.newadd_guomeibi,
            "consume_guomeibi": "消费国美币 : " + result.consume_guomeibi,
            "drawcash_guomeibi": "提现国美币 : " + result.drawcash_guomeibi,
            "operating" : result.operating
        };

        return util.toTable([[oneData]], data.rows, [Cols] , null , [true]);
    },
    //国美币汇总--补充
    tradePanelFour_add(data , query , dates){
        let source = data.first.data[0],
            Result = [],
            count  = 1;
        let result = {};

        let map = {
            "newadd_guomeibi" : "新增国美币",
            "consume_guomeibi": "消费国美币",
            "drawcash_guomeibi": "提现国美币",
        }
        for(let date of dates){
            result[date] = {
                "newadd_guomeibi"    : 0,
                "consume_guomeibi"   : 0,
                "drawcash_guomeibi"  : 0
            }
        }

        for(let item of source){
            item.date = util.getDate(item.date);
            for(let key in result[item.date]){
                result[item.date][key] += item[key];
            }
        }

        if(source.length == 0){ source[0] = {"date":"暂无数据"} };

        let out = util.toTable([source], data.rows, data.cols , [count]);
        return [out[0] , {
            type : "line",
            map : map,
            data : result,
            config: { // 配置信息
                stack: false  // 图的堆叠
            },
            default : true
        }];
    },


    //交易优惠券汇总
    tradePanelFive(data, query, dates) {
        let source = data.first.data[0],
            Table1 = {
                "used_num" : 0, 
                "used_amount" : 0 ,
                "pay_num" : 0,
                "lv" : "0%"
            },
            Table2 = {
                "used_num" : 0, 
                "used_amount" : 0 ,
                "pay_num" : 0,
                "lv" : "0%",
                "operating" : `<button class='btn btn-info' url_detail='/achievements/tradePanelFive_add'>趋势</button>`
            };

        for(let item of source){
            item.date = util.getDate(item.date);
            if(item.coupon_type == 2){
                //平台优惠劵
                Table1.used_num += item.used_num;
                Table1.used_amount += item.used_amount;
                Table1.pay_num += item.pay_num;
            }else if(item.coupon_type == 1){
                //商家优惠劵
                Table2.used_num += item.used_num;
                Table2.used_amount += item.used_amount;
                Table2.pay_num += item.pay_num;
            }
        }

        Table1.lv = util.toFixed( util.dealDivision(Table1.used_num , Table1.pay_num ) , 0);
        Table2.lv = util.toFixed( util.dealDivision(Table2.used_num , Table2.pay_num ) , 0);


        let Cols = [
            [{
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: ""
            }]
        ];

        let oneData = {
            "used_num"    : "平台优惠券使用张数 : " + Table1.used_num,
            "used_amount" : "平台优惠券使用金额 : " + Table1.used_amount,
            "lv"          : "平台优惠券使用占比 : " + Table1.lv,
            "operating"   : Table2.operating
        }

        let twoData = {
             "used_num"   : "商家优惠券使用张数 : " + Table2.used_num,
            "used_amount" : "商家优惠券使用金额 : " + Table2.used_amount,
            "lv"          : "商家优惠券使用占比 : " + Table2.lv,
            "operating"   : ""
        }

        return util.toTable([
            [oneData , twoData]
        ], data.rows, Cols , null , [true , true]);
    },
    //交易优惠券汇总--补充
    tradePanelFive_add(data , query , dates){
        let source = data.first.data[0],
            count  = 1;

        let result = {},map = {},TableSource = [];
        let Rows = data.rows[0],Cols = data.cols[0];
        for(let i=1;i<Rows.length;i++){
            map[Rows[i]] = Cols[i].caption;
        }

        for(let date of dates){
            result[date] = {};
            for(let key in map){
                result[date][key] = 0;
            }
        }

        for(let item of source){
            item.date = util.getDate(item.date);
            let obj = result[item.date];
            if(item.coupon_type == 1){
                //商家优惠劵
                obj.used_num_2 = item.used_num;
                obj.used_amount_2 = item.used_amount;
                obj.lv_2 = util.numberLeave(item.used_num / item.pay_num * 100 , 2);
            }else{
                //平台优惠劵
                obj.used_num = item.used_num;
                obj.used_amount = item.used_amount;
                obj.lv = util.numberLeave(item.used_num / item.pay_num * 100 , 2);
            }
        }

        for(let key in result){
            let obj = result[key];
            obj.date = key;
            TableSource.push(obj);
        }

        let out = util.toTable([TableSource], data.rows, data.cols , [count]);
        return [out[0] , {
            type : "line",
            map : map,
            data : result,
            config: { // 配置信息
                stack: false  // 图的堆叠
            },
            default : true
        }];
    },


    //转化率
    tradePanelSix(data, query, dates) {
        let source = data.first.data[0],
            obj = {
                "pay_user" : 0, 
                "order_user" : 0 ,
                "access_user" : 0,
                "pay_succ_num" : 0,
                "pay_time" : 0
            };

        for(let item of source){
            for(let key in obj){
                obj[key] += item[key];
            }
        }
        let Result = {};
        Result.scan_order = util.toFixed(util.dealDivision(obj.order_user , obj.access_user) , 0);
        Result.scan_pay  = util.toFixed(util.dealDivision(obj.pay_user , obj.access_user) , 0);
        Result.order_pay = util.toFixed(util.dealDivision(obj.pay_user , obj.order_user) , 0);
        Result.pay_lv = util.toFixed(util.dealDivision(obj.pay_succ_num , obj.pay_time) , 0);
        Result.operating = `<button class='btn btn-info' url_detail='/achievements/tradePanelSix_add'>趋势</button>`;

        let Cols = [{
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: "",
                type: "number"
            }, {
                caption: ""
            }];

        let oneData = {
            "scan_order" : "浏览-下单转化率 : " + Result.scan_order,
            "scan_pay"   : "浏览-支付转化率 : " + Result.scan_pay,
            "order_pay"  : "下单-支付转化率 : " + Result.order_pay,
            "pay_lv"     : "支付成功率 : " + Result.pay_lv,
            "operating"  : Result.operating
        } 

        return util.toTable([[oneData]], data.rows, [Cols] , null , [true]);
    },
    //转化率--补充
    tradePanelSix_add(data , query , dates){
        let source = data.first.data[0],
            count  = 1;

        let result = {},map = {},TableSource = [];
        let Rows = data.rows[0],Cols = data.cols[0];
        for(let i=1;i<Rows.length;i++){
            map[Rows[i]] = Cols[i].caption;
        }

        dates.reverse();
        for(let date of dates){
            result[date] = {};
            for(let key in map){
                result[date][key] = 0;
            }
        }

        //"scan_order" , "scan_pay" , "order_pay" , "pay_lv"
        for(let item of source){
            item.date = util.getDate(item.date);
            let obj = result[item.date];
            obj.scan_order = util.dealDivision(item.order_user , item.access_user , 2);
            obj.scan_pay  = util.dealDivision(item.pay_user , item.access_user , 2);
            obj.order_pay = util.dealDivision(item.pay_user , item.order_user , 2);
            obj.pay_lv = util.dealDivision(item.pay_succ_num , item.pay_time , 2);
        }

        for(let key in result){
            let obj = result[key];
            obj.date = key;
            TableSource.push(obj);
        }

        let out = util.toTable([TableSource], data.rows, data.cols , [count]);
        return [out[0] , {
            type : "line",
            map : map,
            data : result,
            config: { // 配置信息
                stack: false  // 图的堆叠
            },
            default : true 
        }];
    }
};