/**
 * @author yanglei
 * @date 20160414
 * @fileoverview 留存分析
 */
var api = require("../../../base/main"),
    filter = require("../../../filters/retainedAnalysis");

module.exports = (Router) => {

    Router = Router.get("/retainedAnalysis/retainedZero_json" , function(req , res , next){
        res.json({
            code: 200,
            modelData: [],
            components: {
                date_picker: {
                    show: true,
                    defaultData: 7,
                    showDayUnit : true
                }
            }
        });
    });

    Router = new api(Router,{
        router : "/retainedAnalysis/retainedOne",
        platform : false,
        modelName : ["UserKeepResult"],
        date_picker : false,
        params(query, params) {
            params.type = query.type || "ios";
            if(query.type === "all") {
                params.type = ["android", "ios"];
            }

             return params;
        },
        global_platform : {
            show: true,
            key: 'type',
            list: [{
                key: 'ios',
                name: 'IOS'
            }, {
                key: 'android',
                name: 'Android'
            }, {
                key: "all",
                name: 'APP'
            }, {
                key: 'pc',
                name: 'PC'
            }, {
                key: 'h5',
                name: 'H5'
            }]
        },
        filter(data, query, dates) {
            return filter.retainedOne(data, query, dates);
        },
    });

    Router = new api(Router,{
        router : "/retainedAnalysis/retainedTwo",
        platform : false,
        modelName : ["UserKeepResult"],
        date_picker : false,
        params(query, params) {
            params.type = query.type || "ios";
            if(query.type === "all") {
                params.type = ["android", "ios"];
            }

             return params;
        },
        firstSql(query, params, isCount) {
            let _sql = 'SELECT date, GROUP_CONCAT(value, ";", `rate_key`) AS `key`, day_type FROM `ads2_user_retention_rate` WHERE date BETWEEN ? AND ? ';
            let _params = [query.startTime, query.endTime, params.day_type];
            if(params.type instanceof Array) {
                let typeStr = [];
                for(let type of params.type) {
                    typeStr.push(`'${type}'`);
                }
                _sql += ` AND type IN (${typeStr.join(",")}) `;
            } else {
                _sql += `AND type='${params.type}'`;
            }
            _sql += ` AND day_type=? GROUP BY date ORDER BY date DESC`;
            if(isCount) {
                let sql = `SELECT COUNT(*) count FROM (${_sql}) a`;

                return {
                    sql : sql,
                    params : _params
                };
            } else {
                let sql = `SELECT * FROM (${_sql}) a LIMIT ?,?`,
                    page = query.page - 1 || 0,
                    offset = query.from || (page * query.limit),
                    limit = query.to || query.limit || 0;

                return {
                    sql : sql,
                    params : _params.concat([+offset, +limit])
                };
            }
        },
        paging : [true],
        filter(data, query) {
            return filter.retainedTwo(data, query.day_type);
        },
        excel_export : true,
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        rows: [],
        cols: []
    });

    return Router;
};