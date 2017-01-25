/**
 * @author yanglei
 * @date 2017-01-23
 * @fileoverview 美办数据
 */

module.exports = {
    index(){
        return {
            id : 301,
            name : "数据总览",
            path : "/office/index",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title: "整体数据",
                    query_api : "/office/indexOne"
                },{
                    type : "chart",
                    title: "整体数据趋势",
                    query_api : "/office/indexTwo"
                },{
                    type : "table",
                    title: "整体数据明细",
                    query_api : "/office/indexThree"
                },{
                    type : "chart",
                    title: "Top 版本",
                    query_api : "/office/indexFour"
                }
            ]
        }
    },
    version(){
        return {
            id : 302,
            name : "版本分析",
            path : "/office/version",
            display : true,
            defaultData : [
                {
                    type : "chart",
                    title: "Top10版本趋势",
                    query_api : "/office/versionOne"
                },{
                    type : "table",
                    title: "版本统计",
                    query_api : "/office/versionTwo"
                }
            ]
        }
    },
};