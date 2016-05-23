System.register(['@angular/platform-browser-dynamic', '@angular/http', './search/search-component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, search_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(search_component_1.SearchComponent, [http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map