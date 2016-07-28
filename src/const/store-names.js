System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FAILSTORENAME, SUCCESSSTORENAME, FOLLOWERSSTORENAME, CURRENTUSERSTORENAME, FOLLOWINGSTORENAME, GISTSSTORENAME;
    return {
        setters:[],
        execute: function() {
            exports_1("FAILSTORENAME", FAILSTORENAME = 'gihubUserFail');
            exports_1("SUCCESSSTORENAME", SUCCESSSTORENAME = 'githubUserSuccess');
            exports_1("FOLLOWERSSTORENAME", FOLLOWERSSTORENAME = 'followers');
            exports_1("CURRENTUSERSTORENAME", CURRENTUSERSTORENAME = 'currentUser');
            exports_1("FOLLOWINGSTORENAME", FOLLOWINGSTORENAME = 'following');
            exports_1("GISTSSTORENAME", GISTSSTORENAME = 'gists');
        }
    }
});
//# sourceMappingURL=store-names.js.map