const pageConfig = require('../config/config');
const pageAll = pageConfig.limit;

const platformType = ['IOS', 'Android', 'APP', 'PC', 'WAP站'];

const filter = (url, type, config, platformKey = ['ios', 'android', 'app', 'pc', 'm']) => {
    try {
        if (config.list && config.list.length) {
            let pageId;
            for (let item of Object.keys(pageAll)) {
                for (let page of pageAll[item].path) {
                    if (url.indexOf(page.path) > -1) {
                        pageId = page.id;
                    }
                }
            }
            if (pageId) {
                // 01001
                let permission = type[pageId];
                let removeList = [];
                for (let i = 0, length = config.list.length; i < length; i++) {
                    let item = config.list[i];
                    let index = platformKey.indexOf(item.key);
                    if (permission[index] === '0') {
                        removeList.push(i);
                    }
                }
                removeList.reverse().forEach(x => {
                    config.list.splice(x, 1);
                });
            }
        }
    } catch(e) {
        console.log('platformPerssion error: ' + e);
    } finally {
        return config;
    }
};

module.exports = filter;