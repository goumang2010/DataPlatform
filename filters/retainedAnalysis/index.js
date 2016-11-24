/**
 * @author yanglei
 * @date 20160414
 * @fileoverview 留存分析
 */
var util = require("../../utils"),
    moment = require("moment");

module.exports = {
    retainedOne(data) {
        var source = data.first.data[0],
            count = data.first.count;
        for(var key of source) {
            key.date = moment(key.date).format("YYYY-MM-DD");
            key.last_1_keep = util.toFixed(key.last_1_keep, key.new_users);
            key.last_7_keep = util.toFixed(key.last_7_keep, key.new_users);
            key.last_14_keep = util.toFixed(key.last_14_keep, key.new_users);
            key.last_30_keep = util.toFixed(key.last_30_keep, key.new_users);
        }
        return util.toTable([source], data.rows, data.cols, [count]);
    }
};