System.register(['@angular/platform-browser-dynamic', '@angular/http', './root/root-component', 'tiny-ng-store/tiny-ng-store', './const/store-helpers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, root_component_1, tiny_ng_store_1, store_helpers_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (root_component_1_1) {
                root_component_1 = root_component_1_1;
            },
            function (tiny_ng_store_1_1) {
                tiny_ng_store_1 = tiny_ng_store_1_1;
            },
            function (store_helpers_1_1) {
                store_helpers_1 = store_helpers_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(root_component_1.RootComponent, [http_1.HTTP_PROVIDERS, store_helpers_1.StoreHelpers, tiny_ng_store_1.TinyNgStore]);
        }
    }
});
//# sourceMappingURL=main.js.map