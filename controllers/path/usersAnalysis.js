/**
 * @author yanglei
 * @date 20160330
 * @fileoverview 新增用户分析
 */

module.exports = {
    newUsers() {
        return {
            id : 104,
            path : "/userAnalysis/newUsers",
            name : "新增用户",
            display : true,
            defaultData : [{
                type : "chart",
                title : "新增用户趋势",
                query_api : "/userAnalysis/newUsersOne"
            }, {
                type : "table",
                title : "新增用户明细",
                query_api : "/userAnalysis/newUsersTwe"
            }]
        };
    },
    activeAccount() {
        return {
            id : 105,
            path : "/userAnalysis/activeAccount",
            name : "活跃用户",
            display : true,
            defaultData : [{
                type : "chart",
                title : "活跃用户趋势",
                query_api : "/userAnalysis/activeAccountOne"
            }, {
                type : "table",
                title : "活跃用户明细",
                query_api : "/userAnalysis/activeAccountTwe"
            }]
        };
    },
    startUp() {
        return {
            id : 106,
            path : "/userAnalysis/startUp",
            name : "启动次数/浏览量",
            display : true,
            defaultData : [{
                type : "chart",
                title : "启动次数/浏览量趋势",
                query_api : "/userAnalysis/startUpOne"
            }, {
                type : "table",
                title : "启动次数/浏览量明细",
                query_api : "/userAnalysis/startUpTwe"
            }]
        };
    },
    version() {
        return {
            id : 107,
            path : "/userAnalysis/version",
            name : "版本分布",
            display : true,
            defaultData : [{
                type : "chart",
                title : "TOP 10版本趋势",
                query_api : "/userAnalysis/versionOne"
            }, {
                type : "table",
                title : "版本用户分布",
                query_api : "/userAnalysis/versionTwo"
            }]
        };
    }
};