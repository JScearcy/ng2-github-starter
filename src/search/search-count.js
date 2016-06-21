System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var INCREMENT, searchCount;
    return {
        setters:[],
        execute: function() {
            exports_1("INCREMENT", INCREMENT = 'INCREMENT');
            exports_1("searchCount", searchCount = function (state, action) {
                switch (action) {
                    case INCREMENT:
                        return state + 1;
                    default:
                        return state;
                }
            });
        }
    }
});
//# sourceMappingURL=search-count.js.map