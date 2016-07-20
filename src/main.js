System.register(['@angular/platform-browser-dynamic', '@angular/http', './search/search-component', 'tiny-ng-store/tiny-ng-store', './const/store-helpers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, search_component_1, tiny_ng_store_1, store_helpers_1;
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
            },
            function (tiny_ng_store_1_1) {
                tiny_ng_store_1 = tiny_ng_store_1_1;
            },
            function (store_helpers_1_1) {
                store_helpers_1 = store_helpers_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(search_component_1.SearchComponent, [http_1.HTTP_PROVIDERS, store_helpers_1.StoreHelpers, tiny_ng_store_1.TinyNgStore]);
        }
    }
});
//# sourceMappingURL=main.js.map